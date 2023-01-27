require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./config/upload");

const express = require('express');
const app = express()
const routes = require('./routes');

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

app.use(express.json())

app.use(routes);

migrationsRun();

app.use(( error, request, response, next ) => {
  console.log(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  // ERRO DO SERVIDOR
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

const PORT = 3333

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))