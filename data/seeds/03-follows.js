/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("follows").del();
    await knex("follows").insert([
        { follower: 2, following: 1 },
        { follower: 3, following: 1 },
    ]);
};
