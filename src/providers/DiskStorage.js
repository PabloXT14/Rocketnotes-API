const fs = require("fs");
const path = require("path");
const uploadConfig = require("../config/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file)
    )

    return file;
  }  

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    try {
      await fs.promises.stat(filePath); // verifica se arquivo ou diretorio existe e retorna informações sobre
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);// deleta um arquivo
  }
}

module.exports = DiskStorage;