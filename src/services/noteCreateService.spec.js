const NoteRepositoryInMemory = require("../repositories/NoteRepositoryInMemory");
const NoteCreateService = require("./NoteCreateService");
const AppError = require("../utils/AppError");

describe("NoteCreateService", () => {
  let noteRepositoryInMemory = null;
  let noteCreateService = null;

  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    noteCreateService = new NoteCreateService(noteRepositoryInMemory);
  });

  it("should be able to create a note", async () => {
    const note = {
      title: "Note Test",
      description: "Description Test",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
      user_id: 1,
    }

    const noteCreated = await noteCreateService.execute(note);

    expect(noteCreated).toHaveProperty("id");
  });

  it("should not be able to create a note without a title", async () => {
    const note = {
      description: "Description Test",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
      user_id: 1,
    }

    await expect(noteCreateService.execute(note)).rejects.toEqual(
      new AppError("O título da nota não pode ser vazio!")
    );
  });

  it("should not be able to create a note without a user_id", async () => {
    const note = {
      title: "Note Test",
      description: "Description Test",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
    }

    await expect(noteCreateService.execute(note)).rejects.toEqual(
      new AppError("O ID do usuário não pode ser nulo!")
    );
  });
})