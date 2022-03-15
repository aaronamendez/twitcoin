const db = require("../configs/database");
const Users = require("../api/routers/auth/models/");
const request = require("supertest");
const server = require("../api/server");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

describe("Environmental Tests", () => {
    test("Test Environment is equal to 'testing'", () => {
        expect(process.env.NODE_ENV).toBe("testing");
    });

    test("The Users Table is Empty", async () => {
        const users = await db("users");
        expect(users).toHaveLength(0);
    });
});

describe("Register Auth Tests", () => {
    test("Post request to /api/auth/register works", () => {});
});
