/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users").insert([
        { username: "draven", email: "draven@gmail.com", password: "pass1234" },
        { username: "lux", email: "lux@gmail.com", password: "pass1234" },
        { username: "talon", email: "talon@gmail.com", password: "pass1234" },
    ]);
};
