const { compare } = require("bcryptjs");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserUpdateService = require("./UserUpdateService");
const AppError = require("../utils/AppError");

describe("UserUpdateService", () => {
  let userRepository = null;
  let userUpdateService = null;
  
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userUpdateService = new UserUpdateService(userRepository);
  });

  it("should be able to update a user", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userRepository.create(user);

    const userUpdated = await userUpdateService.execute({
      user_id: userCreated.id,
      name: "User Test Updated",
      email: "userupdated@test.com",
      password: "321",
      oldPassword: user.password,
    });

    expect(userUpdated).toEqual(expect.objectContaining({
      name: "User Test Updated",
      email: "userupdated@test.com",
    }));

    await expect(compare("321", userUpdated.password)).toBeTruthy();
  });

  it("should not be able to update a user not found", async () => {
    const randomUserId = 1;
    const userUpdatedData = {
      user_id: randomUserId,
      name: "User Test Updated",
      email: "userupdated@test.com",
      newPassword: "321",
      oldPassword: "123",
    }

    await expect(userUpdateService.execute(userUpdatedData)).rejects.toEqual(
      new AppError("Usuário não encontrado!", 404)
    );
  });

  it("should not be able to update the user's email to one that is already in use", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const user2 = {
      name: "User Test",
      email: "user2@test.com",
      password: "123"
    }

    const userCreated = await userRepository.create(user);
    await userRepository.create(user2);

    const userUpdatedData = {
      user_id: userCreated.id,
      name: "User Test Updated",
      email: user2.email,
      newPassword: "321",
      oldPassword: "123",
    }

    await expect(userUpdateService.execute(userUpdatedData)).rejects.toEqual(
      new AppError("Este e-mail já está em uso!")
    );
  });

  it("should not be able to update user's password without the old password", async () => {
    expect(2+2).toBe(5);
  });

  it("should not be able to update user if the old password is wrong", async () => {
    expect(2+2).toBe(5);
  });
})