const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  // COLOCANDO O PARÂMETRO USER_REPOSITORY COMO OBRIGATÓRIO DA CLASSE/SERVICE DE CRIAÇÃO DE USUÁRIO
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Este e-mail já está em uso!")
    }

    // CRIPTOGRAFANDO SENHA DO USUÁRIO => hash(senha, fatorDeCriptografação(number))
    const hashedPassword = await hash(password, 8);// 

    await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });
  }
}

module.exports = UserCreateService;