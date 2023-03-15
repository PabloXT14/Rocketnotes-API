const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserShowService = require("./UserShowService");
const AppError = require("../utils/AppError");

describe("UserShowService", () => {
  let userRepository = null; 
  let userShowService = null; 

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userShowService = new UserShowService(userRepository);
  });

  it("should be able to show a user", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userRepository.create(user);

    const userSearched = await userShowService.execute(userCreated.id);

    expect(userSearched).toHaveProperty("id");
  });

  it("should not be able to show a user with a none existing id", async () => {
    const randomUserId = 1;
    await expect(userShowService.execute(randomUserId)).rejects.toEqual(
      new AppError("Usuário não encontrado!", 404)
    );
  });
})