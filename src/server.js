require("express-async-errors");
require("dotenv").config();

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./config/upload");

const cors = require("cors");
const express = require('express');
const app = express()
const routes = require('./routes');

migrationsRun();

app.use(cors());
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));
app.use(express.json())

app.use(routes);

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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))