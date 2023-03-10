class NoteCreateService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ title, description, tags, links, user_id }) {
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