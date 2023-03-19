const NoteRepository = require("../repositories/NoteRepository");
const NoteCreateService = require("../services/NoteCreateService");
const NoteListAllService = require("../services/NoteListAllService");
const NoteShowService = require("../services/NoteShowService");
const NoteDeleteService = require("../services/NoteDeleteService");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    const noteRepository = new NoteRepository();
    const noteCreateService = new NoteCreateService(noteRepository);

    await noteCreateService.execute({ title, description, tags, links, user_id });

    return response.status(201).json();
  }

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

    const noteRepository = new NoteRepository();
    const noteShowService = new NoteShowService(noteRepository);

    const note = await noteShowService.execute({ id, user_id });

    return response.json(note);
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const noteRepository = new NoteRepository();
    const noteDeleteService = new NoteDeleteService(noteRepository);

    await noteDeleteService.execute({ id, user_id });

    return response.status(200).json();
  }
}

module.exports = NotesController;