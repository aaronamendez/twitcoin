/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("users", (tbl) => {
        tbl.string("bio", 120);
        tbl.string("location", 20);
        tbl.string("website", 30);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("users", (tbl) => {
        tbl.dropColumn("bio");
        tbl.dropColumn("location");
        tbl.dropColumn("website");
    });
};
