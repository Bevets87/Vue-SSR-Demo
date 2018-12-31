const usersController = require("../../../server/controllers/users");
const { seedDB, setupDB, cleanupDB } = require("../helpers");

describe("Users Controller", () => {
  beforeAll(done => {
    setupDB()
      .then(() => seedDB())
      .then(() => done());
  });
  afterAll(done => {
    cleanupDB().then(() => done());
  });

  it("can getMe(req, res)", async () => {
    const user = { id: 1 };
    const req = { session: { user } };
    const res = {};
    const response = await usersController.getMe(req, res);
    expect(response.id).toEqual(1);
  });

  it("can updateMe(req, res)", async () => {
    const user = { id: 1 };
    const session = { user };
    const req = { session };
    const res = {};
    const { password } = await usersController.getMe(req, res);
    const body = { username: "updatedtest@test.com", password };
    req.body = body;
    await usersController.updateMe(req, res);
    const { name } = await usersController.getMe(req, res);
    expect(name).toContain("updatedtest@test.com");
  });

  it("can deleteMe(req, res)", async () => {
    const user = { id: 1 };
    const session = { user };
    const req = { session };
    const res = {};
    await usersController.deleteMe(req, res);

    try {
      const response = await usersController.getMe(req, res);
    } catch (error) {
      expect(error.message).toContain("Unable to get user");
    }
  });
});
