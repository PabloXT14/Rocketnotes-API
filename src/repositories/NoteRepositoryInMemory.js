class NoteRepositoryInMemory {
  notes = [];

  async create({ title, description, tags = [], links = [], user_id}) {
    const note = {
      id: this.notes.length + 1,
      title,
      description,
      tags,
      links,
      user_id,
    }

    this.notes.push(note);

    return note;
  }
}

module.exports = NoteRepositoryInMemory;