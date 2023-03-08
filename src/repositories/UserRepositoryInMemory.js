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
}

module.exports = UserRepositoryInMemory;