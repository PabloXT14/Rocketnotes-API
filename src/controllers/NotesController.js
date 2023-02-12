const knex = require("../database/knex");

class NotesController {
  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map(tag => tag.trim());

      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.description",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("tags.name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")// InnerJoin(tabela extrangeira, campo da tab ex., campo da tab. atual)
        .groupBy("notes.id")
        .orderBy("notes.title")
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      }
    })

    return response.status(200).json(notesWithTags);
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id }).orderBy("created_at");

    return response.json({
      ...note,
      tags,
      links
    })
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    /* INSERINDO NOTA */
    const note_id = await knex("notes").insert({
      title,
      description,
      user_id,
    })

    /* INSERINDO LINKS */
    if (links && links.length > 0) {
      const linksInsert = links.map(link => {
        return {
          note_id: note_id[0],
          url: link
        }
      })

      await knex("links").insert(linksInsert)
    }


    /* INSERINDO TAGS */
    if (tags && tags.length > 0) {
      const tagsInsert = tags.map(tag => {
        return {
          note_id: note_id[0],
          user_id,
          name: tag,
        }
      })

      await knex("tags").insert(tagsInsert);
    }

    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.status(200).json();
  }

}

module.exports = NotesController;