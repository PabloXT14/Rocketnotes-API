class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    // 400 => status code padrão caso não seja informado 
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError