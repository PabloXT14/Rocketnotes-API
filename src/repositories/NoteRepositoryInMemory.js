class NoteRepositoryInMemory {
  notes = [];

  async create({ title, description, tags, links, user_id }) {
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

  async findById({ id, user_id }) {
    const note = await this.notes.find(note => note.id === id && note.user_id === user_id);

    return note;
  }

  async findAll({ user_id, title, tags }) {
    let notes;
    const tagsExist = tags.length > 0;

    if (tagsExist) {
      const filterTags = tags.split(",").map(tag => tag.trim());

      notes = await this.notes.filter(note => {
        const userIdExists = note.user_id === user_id;
        const hasTitle = note.title.toLowerCase().includes(title.toLowerCase());
        const hasSomeTags = filterTags.some(tag => note.tags.includes(tag)); 

        if (userIdExists && hasTitle && hasSomeTags) return note;
      })
    } else {
      notes = await this.notes.filter(note => {
        const userIdExists = note.user_id === user_id;
        const hasTitle = note.title.toLowerCase().includes(title.toLowerCase());

        if (userIdExists && hasTitle) return note;
      });
    }

    return notes;
  }
}

module.exports = NoteRepositoryInMemory;