const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await knex.raw("SELECT * FROM tags WHERE user_id = ? GROUP BY name", [user_id]);

    return response.status(200).json(tags);
  }
}

module.exports = TagsController;