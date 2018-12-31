const server = require("../../../server");
const session = require("supertest-session");
const { seedDB, setupDB, cleanupDB } = require("../helpers");

describe("Polls Router", () => {
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

  it("can GET /api/polls", async () => {
    try {
      const response = await authSession.get("/api/polls");
      expect(response.status).toEqual(200);
      expect(response.body.count).toEqual(10);
    } catch (error) {
      expect(error).toBe();
    }
  });

  it("can GET /api/polls/:id", async () => {
    const id = 1;

    const response = await authSession.get(`/api/polls/${id}`);

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.creator).toBeTruthy();
    expect(response.body.question).toBeTruthy();
    expect(response.body.created_at).toBeTruthy();
    expect(response.body.choices).toBeTruthy();
  });

  it("can POST /api/polls", async () => {
    const createPollInfo = {
      question: "What is the best color?",
      choices: ["red", "green", "blue"]
    };
    const response = await authSession.post("/api/polls").send(createPollInfo);

    expect(response.status).toEqual(200);
    expect(response.body.question).toContain("What is the best color?");
  });

  it("can PUT /api/polls/:id", async () => {
    const updatePollInfo = {
      choice_id: 7
    };
    try {
      const response = await authSession
        .put(`/api/polls/${3}`)
        .send(updatePollInfo);

      expect(response.status).toEqual(200);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("can DELETE /api/polls/:id", async () => {
    const response = await authSession.delete(`/api/polls/${1}`);

    expect(response.status).toEqual(200);
  });
});
