exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name");

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");// quando deletar uma <note> específica deleta também as <tags> relacionadas a está <note>
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");;
});

exports.down = knex => knex.schema.dropTable("tags");