const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class UsersController {

  async show(request, response) {
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return response.status(200).json(user);
  }

  async create(request, response) {
    const { name, email, password } = request.body;

    const userAlreadyExists = await knex("users").where({ email }).first();

    if (userAlreadyExists) {
      throw new AppError("Este e-mail já está em uso!")
    }

    // CRIPTOGRAFANDO SENHA DO USUÁRIO => hash(senha, fatorDeCriptografação(number))
    const hashedPassword = await hash(password, 8);// 

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json({
      message: "Usuário criado!"
    });
  }

  async update(request, response) {
    const { name, email, newPassword, oldPassword } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado!")
    }

    const userWithEmailToUpdate = await knex("users").where({ email }).first();

    if (userWithEmailToUpdate && userWithEmailToUpdate.id !== user.id) {
      throw new AppError("Este e-mail já está em uso!");
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

    await knex("users")
      .update({
        ...user,
        updated_at: knex.fn.now()
      })
      .where({ id: user.id });

    return response.status(200).json({ message: "Usuário atualizado!" })
  }
}

module.exports = UsersController;