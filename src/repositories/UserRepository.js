const knex = require("../database/knex");

class UserRepository {
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

  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async findByUserId(userId) {
    const user = await knex("users").where({ id: userId }).first();

    return user;
  }

  async update(user) {
    const userUpdated = await knex("users")
    .where({ id: user.id })
    .update({
      ...user,
      updated_at: knex.fn.now(),
    })
    .returning("*")
    .then(result => {
      return result[0];// Retornando dados do último registro atualizado
    });

    return userUpdated;
  }
}

module.exports = UserRepository;