const AppError = require("../utils/AppError");

class NoteShowService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ id, user_id = null }) {
    const noteUserIdIsNull = user_id === null;

    if (noteUserIdIsNull) throw new AppError("O ID do usuário não pode ser nulo!");

    const note = await this.noteRepository.findById({ id, user_id });

    if (!note) {
      throw new AppError("Nota não encontrada no usuário atual", 404);
    }

    return note;
  }
}

module.exports = NoteShowService;