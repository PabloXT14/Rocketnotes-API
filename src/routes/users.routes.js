const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.MULTER); // INICIALIZANDO O MUTER EM NOSSA APLICAÇÃO

usersRouter.post("/", usersController.create);
usersRouter.get("/", ensureAuthenticated, usersController.show);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRouter;