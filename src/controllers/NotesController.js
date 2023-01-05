const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body; 
    const { user_id } = request.params;

    /* INSERINDO NOTA */
    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    })

    /* INSERINDO LINKS */
    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("links").insert(linksInsert)

    /* INSERINDO TAGS */
    const tagsInsert = tags.map(tag => {
      return {
        note_id,
        user_id,
        name: tag,
      }
    })

    await knex("tags").insert(tagsInsert);

    return response.status(201).json();
  }
}

module.exports = NotesController;