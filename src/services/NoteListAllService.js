const AppError = require("../utils/AppError");

class NoteListAllService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ user_id = null, title = "", tags = [] }) {
    const noteUserIdIsNull = user_id === null;

    if (noteUserIdIsNull) throw new AppError("O ID do usuário não pode ser nulo!");

    const notes = await this.noteRepository.findAll({
      user_id,
      title,
      tags,
    });

    return notes;
  }
}

module.exports = NoteListAllService;