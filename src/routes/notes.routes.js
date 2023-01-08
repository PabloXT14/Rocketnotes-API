const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.get("/", notesController.index);
notesRouter.get("/:id", notesController.show);
notesRouter.post("/:user_id", notesController.create);
notesRouter.delete("/:id", notesController.delete);

module.exports = notesRouter;
