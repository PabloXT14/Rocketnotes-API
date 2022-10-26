
const USERS = [];// fake database

class UsersController {
  index(request, response) {
    return response.status(200).json(USERS);
  }

  show(request, response) {
    const { id } = request.params;

    const userExists = USERS.find(user => user.id === id)

    if (!userExists) return response.status(404).json({ message: "User doesn't exist!" })

    return response.status(200).json(userExists);
  }

  create(request, response) {
    const { name, email, password } = request.body;

    const newUser = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name,
      email,
      password
    }

    USERS.push(newUser);

    return response.status(201).json(newUser);
  }
}

module.exports = UsersController;