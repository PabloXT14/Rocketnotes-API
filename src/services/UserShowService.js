const AppError = require("../utils/AppError");

class UserShowService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

    return user;
  }
}

module.exports = UserShowService;