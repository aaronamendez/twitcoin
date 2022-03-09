/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 20).notNullable().unique();
      tbl.string("email", 60).notNullable().unique();
      tbl.string("password", 128).notNullable();
    })
    .createTable("posts", (tbl) => {
      tbl.increments("post_id");
      tbl.string("post_body", 280).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
