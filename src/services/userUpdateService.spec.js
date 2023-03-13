const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserUpdateService = require("./UserUpdateService");
const UserCreateService = require("./UserCreateService");

describe("UserUpdateService", () => {
  let userRepositoryInMemory = null;
  let userUpdateService = null;
  let userCreateService = null;
  
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userUpdateService = new UserUpdateService(userRepositoryInMemory);
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("should be able to update a user", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userCreateService.execute(user);

    const exampleUserUpdated = {
      ...userCreated,
      name: "User Test Updated",
      email: "userupdated@test.com",
      password: "321"
    }

    const userUpdated = await userUpdateService.execute({
      user_id: userCreated.id,
      name: exampleUserUpdated.name,
      email: exampleUserUpdated.email,
      newPassword: exampleUserUpdated.password,
      oldPassword: user.password,
    });

    expect(userUpdated).toEqual(exampleUserUpdated);
  })
})