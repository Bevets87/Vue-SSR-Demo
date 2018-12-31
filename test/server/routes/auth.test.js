const server = require("../../../server");
const request = require("supertest");
const { setupDB, cleanupDB } = require("../helpers");

describe("Auth Router", () => {
  beforeAll(async () => {
    await setupDB();
  });

  afterAll(async () => {
    await cleanupDB();
  });

  it("can POST /auth/register", async () => {
    const response = await request(server)
      .post("/auth/register")
      .send({
        username: "test@test.com",
        password: "password",
        passwordConfirmation: "password"
      });

    expect(response.status).toEqual(200);
    expect(response.body.name).toContain("test@test.com");
  });

  it("can POST /auth/login", async () => {
    const loginInfo = {
      username: "test@test.com",
      password: "password"
    };

    const response = await request(server)
      .post("/auth/login")
      .send(loginInfo);

    expect(response.status).toEqual(200);
    expect(response.body.name).toContain("test@test.com");
  });

  it("can POST /auth/logout", async () => {
    const response = await request(server).post("/auth/logout");

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({ ok: true });
  });
});
