const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {

  async show(request, response) {
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = ?", [user_id])

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return response.status(200).json(user);
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
    const { name, email, newPassword, oldPassword } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado!")
    }

    const userWithEmailToUpdate = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userWithEmailToUpdate && userWithEmailToUpdate.id !== user.id) {
      throw new AppError("Este e-mail já está em uso!")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // VERIFICAÇÃO DE ATUALIZAÇÃO DE SENHA
    if (newPassword && !oldPassword) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha!");
    }

    if (newPassword && oldPassword) {

      const isOldPasswordCorrect = await compare(oldPassword, user.password);
      
      if (!isOldPasswordCorrect) {
        throw new AppError("A senha antiga não confere!");
      }

      user.password = await hash(newPassword, 8);
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.status(200).json({ message: "Usuário atualizado!" })
  }
}

module.exports = UsersController;