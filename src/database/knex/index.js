require("dotenv").config();
const environment = process.env.ENVIRONMENT;
const config = require("../../../knexfile");
const knex = require("knex");

const knexConnection = knex(config[environment]);

knexConnection.client.pool.on('createSuccess', (eventId, resource) => {
  resource.run('PRAGMA foreign_keys = ON', () => {})
});

module.exports = knexConnection;