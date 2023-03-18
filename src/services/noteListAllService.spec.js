const NoteRepositoryInMemory = require("../repositories/NoteRepositoryInMemory");
const NoteListAllService = require("./NoteListAllService");
const AppError = require("../utils/AppError");

describe("NoteListAllService", () => {
  let noteRepository;
  let noteListAllService;
  
  beforeEach(() => {
    noteRepository = new NoteRepositoryInMemory();
    noteListAllService = new NoteListAllService(noteRepository);
  });

  it("should be able to list notes", async () => {
    const note1 = await noteRepository.create({
      title: "Note 1",
      description: "Description 1",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
      user_id: 1,
    });

    const note2 = await noteRepository.create({
      title: "Note 2",
      description: "Description 2",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
      user_id: 1,
    });

    const notesSearched = await noteListAllService.execute({
      user_id: 1,
      title: "",
      tags: [],
    });

    expect(notesSearched).toEqual([note1, note2]);
  });

  it("should not be able to list notes without a user id", async () => {
    const notesSearch = {
      user_id: null,
      title: "",
      tags: [],
    }

    await expect(noteListAllService.execute(notesSearch)).rejects.toEqual(
      new AppError("O ID do usuário não pode ser nulo!")
    );
  });
})