const { compare } = require("bcryptjs");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserUpdateService = require("./UserUpdateService");
const UserCreateService = require("./UserCreateService");

describe("UserUpdateService", () => {
  let userRepository = null;
  let userUpdateService = null;
  let userCreateService = null;
  
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userUpdateService = new UserUpdateService(userRepository);
    userCreateService = new UserCreateService(userRepository);
  });

  it("should be able to update a user", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userCreateService.execute(user);

    const userUpdated = await userUpdateService.execute({
      user_id: userCreated.id,
      name: "User Test Updated",
      email: "userupdated@test.com",
      newPassword: "321",
      oldPassword: user.password,
    });

    expect(userUpdated).toEqual(expect.objectContaining({
      name: "User Test Updated",
      email: "userupdated@test.com",
    }));

    await expect(compare("321", userUpdated.password)).toBeTruthy();
  });

  it("should not be able to update a user not found", async () => {

  });

  it("should not be able to update the user's email to one that is already in use", async () => {

  });

  it("should not be able to update user's password without the old password", async () => {

  });

  it("should not be able to update user if the old password is wrong", async () => {

  });
})