const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async create({ name, email, password }) {
    const userId = await knex("users")
    .returning("id")
    .insert({
      name,
      email,
      password,
    })
    .then(result => {
      return result[0].id;// Retorna o ID do ultimo registro inserido
    });

    return { id: userId };
  }
}

module.exports = UserRepository;