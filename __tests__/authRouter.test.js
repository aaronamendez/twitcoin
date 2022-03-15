const db = require("../configs/database");
const Users = require("../api/routers/auth/models/");
const request = require("supertest");
const server = require("../api/server");

beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

describe("Environmental Tests", () => {
    test("test environment is equal to 'testing'", () => {
        expect(process.env.NODE_ENV).toBe("testing");
    });

    test("the users table is empty", async () => {
        const users = await db("users");
        expect(users).toHaveLength(0);
    });
});

describe("Register Auth Tests", () => {
    test("[POST] /api/auth/register", async () => {
        let user = {
            username: "foo",
            email: "foo@gmail.com",
            password: "foobar123",
        };
        let result = await request(server)
            .post("/api/auth/register")
            .send(user);
        expect(result.status).toBe(201);
    });
});

describe("Login Auth Tests", () => {
    test("[POST] /api/auth/login", async () => {
        let user = {
            username: "foo",
            email: "foo@gmail.com",
            password: "foobar123",
        };
        let result1 = await request(server)
            .post("/api/auth/register")
            .send(user);
        expect(result1.status).toBe(201);

        let user2 = {
            usernameOrEmail: "foo",
            password: "foobar123",
        };

        let result2 = await request(server).post("/api/auth/login").send(user2);
        expect(result2.status).toBe(200);
    });
});
