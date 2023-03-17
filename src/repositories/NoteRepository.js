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

  async findAll({ user_id, title, tags }) {
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
        .whereRaw("lower(notes.title) LIKE ?", [`%${title.toLowerCase()}%`])
        .whereIn("tags.name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")// InnerJoin(tabela extrangeira, campo da tab ex., campo da tab. atual)
        .groupBy("notes.id")
        .orderBy("notes.title")
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereRaw("lower(title) LIKE ?", [`%${title.toLowerCase()}%`])
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      }
    });

    return notesWithTags;
  }
}

module.exports = NoteRepository;