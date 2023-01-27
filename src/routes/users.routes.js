const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post("/", usersController.create);

usersRouter.get("/", ensureAuthenticated, usersController.show);

usersRouter.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRouter;