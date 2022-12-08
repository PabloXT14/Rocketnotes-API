const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  async index(request, response) {
    const database = await sqliteConnection();

    const users = await database.all("SELECT * FROM users");

    return response.status(200).json(users);
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

    const userAlreadyExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    // OUTRA MANEIRA DE MONTAR A QUERY
    // const userAlreadyExists = await database.get(`SELECT * FROM users WHERE email = '${email}'`);

    if (userAlreadyExists) {
      throw new AppError("Este e-mail já está em uso!")
    }

    // CRIPTOGRAFANDO SENHA DO USUÁRIO => hash(senha, fatorDeCriptografação(number))
    const hashedPassword = await hash(password, 8);// 

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, hashedPassword]
    );
    // OUTRA MANEIRA DE MONTAR A QUERY
    // await database.run(
    //   `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`
    // );

    return response.status(201).json({
      message: "Usuário criado!"
    });
  }

  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado!")
    }

    const userWithEmailToUpdate = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userWithEmailToUpdate && userWithEmailToUpdate.id !== user.id) {
      throw new AppError("Este e-mail já está em uso!")
    }

    user.name = name;
    user.email = email;

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    )

    return response.status(200).json({ message: "Usuário atualizado!" })
  }
}

module.exports = UsersController;