require("dotenv").config();
const environment = process.env.ENVIRONMENT;
const config = require("../../../knexfile");
const knex = require("knex");

console.log(environment);

const connection = knex(config[environment]);

module.exports = connection;