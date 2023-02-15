const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await knex.select("name", knex.raw("MAX(id) as id"))// retornando como id do agrupamento das tags, o ultimo/maior id de registro da tabela de cada grupo de tags
    .from("tags")
    .where({ user_id })
    .groupBy("name")
    .orderBy("name")
    .then((rows) => {
      return rows; // retorna um array de objetos com as tags filtradas e agrupadas
    });

    return response.status(200).json(tags);
  }
}

module.exports = TagsController;