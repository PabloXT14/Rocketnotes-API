const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const useExists = await knex("users").where({ id: user_id });

    if(!useExists) {
      throw new AppError("User not found", 404);
    }

    const tags = await knex("tags")
      .where({ user_id })
      .groupBy("tags.name")
      .orderBy("tags.name");

    return response.status(200).json(tags);
  }
}

module.exports = TagsController;