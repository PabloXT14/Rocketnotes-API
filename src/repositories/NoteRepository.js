const knex = require("../database/knex");

class NoteRepository {
  async create({ title, description, tags, links, user_id }) {
    /* INSERINDO NOTA */
    const note_id = await knex("notes")
      .returning('id')
      .insert({
        title,
        description,
        user_id,
      })
      .then(result => {
        return result[0].id;// Retorna o ID do ultimo registro inserido
      });

    /* INSERINDO LINKS */
    if (links && links.length > 0) {
      const linksInsert = links.map(link => {
        return {
          note_id,
          url: link,
        }
      })

      await knex("links").insert(linksInsert)
    }


    /* INSERINDO TAGS */
    if (tags && tags.length > 0) {
      const tagsInsert = tags.map(tag => {
        return {
          note_id,
          user_id,
          name: tag,
        }
      })

      await knex("tags").insert(tagsInsert);
    }

    return { id: note_id }
  }

  async findById({ id, user_id }) {
    const note = await knex("notes").where({ id }).andWhere({ user_id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id }).orderBy("created_at");

    const noteData = {
      ...note,
      tags,
      links
    }

    return noteData;
  }
}

module.exports = NoteRepository;