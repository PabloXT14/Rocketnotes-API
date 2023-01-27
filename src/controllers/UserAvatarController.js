const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
    }

    // DELETANDO FOTO DE PERFIL ANTIGA
    if (user.avatar_url) {
      await diskStorage.deleteFile(user.avatar_url);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar_url = filename;

    await knex("users").update(user).where({ id: user_id });

    return response.status(200).json(user);
  }
}

module.exports = UserAvatarController;