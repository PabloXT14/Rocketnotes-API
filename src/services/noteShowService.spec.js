const NoteRepositoryInMemory = require("../repositories/NoteRepositoryInMemory");
const NoteShowService = require("./NoteShowService");
const AppError = require("../utils/AppError");

describe("NoteShowService", () => {
  let noteRepository;
  let noteShowService;
  
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    noteShowService = new NoteShowService(noteRepository);
  });

  it("should be able to show a note", async () => {
    const note = await noteRepository.create({
      title: "Note title",
      description: "Note description",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
      user_id: 1,
    });

    const noteSearched = await noteShowService.execute({ id: note.id, user_id: 1 });

    expect(noteSearched).toEqual(note);
  });

  it("should not be able to show a note that does not exist", async () => {
    const randomNoteId = 7;
    const randomUserId = 7;

    await expect(noteShowService.execute({ 
      id: randomNoteId, 
      user_id: randomUserId
    })).rejects.toEqual(
      new AppError("Nota não encontrada no usuário atual", 404)
    );
  });

  it("should not be able to show a note without a user id", async () => {
    const randomNoteId = 7;

    await expect(noteShowService.execute({
      id: randomNoteId,
    })).rejects.toEqual(
      new AppError("O ID do usuário não pode ser nulo!")
    );
  });
})