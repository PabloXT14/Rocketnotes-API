require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection:
      process.env.DATABASE_CLIENT === 'sqlite'
        ? {
          filename: process.env.DATABASE_URL,
        }
        : process.env.DATABASE_URL,
    pool: {
      afterCreate: (connection, callback) => connection.run("PRAGMA foreign_keys = ON", callback)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations"),
    },
    useNullAsDefault: true,
  },
  production: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations"),
    },
    useNullAsDefault: true,
  },
};
