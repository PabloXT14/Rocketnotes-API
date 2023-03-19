const NoteRepositoryInMemory = require("../repositories/NoteRepositoryInMemory");
const NoteDeleteService = require("../services/NoteDeleteService");
const AppError = require("../utils/AppError");

describe("NoteDeleteService", () => {
  let noteRepository;
  let noteDeleteService;
  
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    noteDeleteService = new NoteDeleteService(noteRepository);
  });

  it("should be able to delete a note", async () => {
    const note = await noteRepository.create({
      title: "Note title",
      description: "Note description",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
      user_id: "user_id",
    });

    const isNoteDeleted = await noteDeleteService.execute({ id: note.id, user_id: note.user_id });

    expect(isNoteDeleted).toBe(true);
  });

  it("should not be able to delete a note that does not exist", async () => {
    const randomNoteId = 7;
    const randomUserId = 7;

    await expect(noteDeleteService.execute({ 
      id: randomNoteId, 
      user_id: randomUserId 
    })).rejects.toEqual(
      new AppError("Nota não encontrada no usuário atual", 404)
    );
  });
});