const AppError = require("../utils/AppError");

class NoteCreateService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ title = "", description = "", tags = [], links = [], user_id = null }) {
    const noteTitleIsEmpty = title === "";
    const noteUserIdIsNull = user_id === null;

    if (noteTitleIsEmpty) {
      throw new AppError("O título da nota não pode ser vazio!");
    }

    if (noteUserIdIsNull) {
      throw new AppError("O ID do usuário não pode ser nulo!");
    }

    const noteCreated = await this.noteRepository.create({
      title,
      description,
      tags,
      links,
      user_id,
    })

    return noteCreated;
  }
}

module.exports = NoteCreateService;