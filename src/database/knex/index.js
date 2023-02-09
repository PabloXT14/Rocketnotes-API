require("dotenv").config();
const environment = process.env.ENVIRONMENT;
const config = require("../../../knexfile")[environment];
const knex = require("knex");

const connection = knex(config);

module.exports = connection;