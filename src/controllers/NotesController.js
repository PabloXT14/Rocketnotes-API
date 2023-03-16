const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const NoteRepository = require("../repositories/NoteRepository");
const NoteCreateService = require("../services/NoteCreateService");
const NoteListAllService = require("../services/NoteListAllService");

class NotesController {
  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    const noteRepository = new NoteRepository();
    const noteListAllService = new NoteListAllService(noteRepository);

    const notes = await noteListAllService.execute({
      user_id,
      title,
      tags,
    });

    return response.status(200).json(notes);
  }

  async show(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const note = await knex("notes").where({ id }).andWhere({ user_id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id }).orderBy("created_at");

    if (!note) {
      throw new AppError("Nota não encontrada no usuário atual", 404);
    }

    return response.json({
      ...note,
      tags,
      links
    })
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    const noteRepository = new NoteRepository();
    const noteCreateService = new NoteCreateService(noteRepository);

    await noteCreateService.execute({ title, description, tags, links, user_id });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const noteDeleted = await knex("notes").where({ id }).andWhere({ user_id }).delete();

    if (!noteDeleted) {
      throw new AppError("Nota não encontrada no usuário atual", 404);
    }

    return response.status(200).json();
  }

}

module.exports = NotesController;