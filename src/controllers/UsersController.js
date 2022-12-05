const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  index(request, response) {
    return response.status(200).json([]);
  }

  show(request, response) {
    const { id } = request.params;

    const userExists = USERS.find(user => user.id === id)

    if (!userExists) return response.status(404).json({ message: "User doesn't exist!" })

    return response.status(200).json(userExists);
  }

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    // OUTRA MANEIRA DE MONTAR A QUERY
    // const userAlreadyExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    const userAlreadyExists = await database.get(`SELECT * FROM users WHERE email = '${email}'`);

    if (userAlreadyExists) {
      throw new AppError("Este e-mail já está em uso!")
    }

    return response.status(201).json({
      message: "Usuário criado!"
    });
  }
}

module.exports = UsersController;