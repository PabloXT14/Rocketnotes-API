const { Router } = require("express");
const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;