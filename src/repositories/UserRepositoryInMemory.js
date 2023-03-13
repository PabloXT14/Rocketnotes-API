class UserRepositoryInMemory {
  user = [];

  async create({ name, email, password }) {
    const user = {
      id: this.user.length + 1,
      name,
      email,
      password
    };

    this.user.push(user);

    return user;
  }

  async findByEmail(email) {
    const user = this.user.find(user => user.email === email);

    return user;
  }

  async findByUserId(userId) {
    const user = this.user.find(user => user.id === userId);

    return user;
  }

  async update(user) {
    this.user = this.user.map(actualUser => {
      if (actualUser.id === user.id) {
        return user;
      }

      return actualUser;
    });

    const userUpdated = this.user.find(actualUser => actualUser.id === user.id);

    return userUpdated;
  }
}

module.exports = UserRepositoryInMemory;