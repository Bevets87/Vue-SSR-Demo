const server = require("../../../server");
const session = require("supertest-session");
const { seedDB, setupDB, cleanupDB } = require("../helpers");

describe("Users Router", () => {
  let authSession;

  beforeAll(async () => {
    await setupDB();
    await seedDB();
    const testSession = session(server);
    const response = await testSession.post("/auth/register").send({
      username: "test@test.com",
      password: "password",
      passwordConfirmation: "password"
    });
    expect(response.status).toEqual(200);
    authSession = testSession;
  });

  afterAll(async () => {
    await cleanupDB();
  });

  it("can GET /api/users/me", async () => {
    const response = await authSession.get("/api/users/me");

    expect(response.status).toEqual(200);
    expect(response.body.name).toBeTruthy();
  });

  it("can POST /api/users/me", async () => {
    const updateUserInfo = {
      username: "updated@test.com",
      password: "password"
    };

    const response = await authSession
      .post("/api/users/me")
      .send(updateUserInfo);

    expect(response.status).toEqual(200);
  });

  it("can POST /api/users/me/delete", async () => {
    const response = await authSession.post("/api/users/me/delete");
    expect(response.status).toEqual(200);
  });
});
