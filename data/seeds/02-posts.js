/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      post_body: "I just pulled off a pentakill with my axes yo!!",
      user_id: 1,
    },
    { post_body: "I sniped someone from base with my light beam!", user_id: 2 },
    {
      post_body: "I popped the adc in less than 1 second.. that was rad!",
      user_id: 3,
    },
  ]);
};
