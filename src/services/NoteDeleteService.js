const AppError = require("../utils/AppError");

class NoteDeleteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ id, user_id }) {
    const isNoteDeleted = await this.noteRepository.delete({ id, user_id }); 

    if (!isNoteDeleted) {
      throw new AppError("Nota não encontrada no usuário atual", 404);
    }

    return isNoteDeleted;
  }
}

module.exports = NoteDeleteService;