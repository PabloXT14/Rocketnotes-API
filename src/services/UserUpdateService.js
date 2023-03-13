const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, newPassword, oldPassword, user_id }) {
    const user = await this.userRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    const userWithEmailToUpdate = await this.userRepository.findByEmail(email);

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
        throw new AppError("Senha antiga incorreta!");
      }

      user.password = await hash(newPassword, 8);
    }

    const userUpdated = await this.userRepository.update(user);

    return userUpdated;
  }
}

module.exports = UserUpdateService;