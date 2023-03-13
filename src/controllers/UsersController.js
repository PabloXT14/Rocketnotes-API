const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const UserShowService = require("../services/UserShowService");
const UserUpdateService = require("../services/UserUpdateService");

const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json({
      message: "Usuário criado!"
    });
  }

  async show(request, response) {
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userShowService = new UserShowService(userRepository);

    const user = await userShowService.execute(user_id);

    return response.status(200).json(user);
  }

  async update(request, response) {
    const { name, email, newPassword, oldPassword } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userUpdateService = new UserUpdateService(userRepository);

    await userUpdateService.execute({
      name,
      email,
      newPassword,
      oldPassword,
      user_id
    });

    return response.status(200).json({ message: "Usuário atualizado!" })
  }
}

module.exports = UsersController;