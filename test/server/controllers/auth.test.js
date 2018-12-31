const authController = require("../../../server/controllers/auth");
const users = require("../../../server/data/users");
const { setupDB, cleanupDB, seedDB } = require("../helpers");

describe("Auth Controller", () => {
  beforeAll(done => {
    setupDB()
      .then(() => seedDB())
      .then(() => done());
  });

  afterAll(done => {
    cleanupDB().then(() => done());
  });

  it("can getByUsername(req, res, next)", async () => {
    const res = {
      status: jest.fn(function() {
        return this;
      }),
      json: jest.fn(function() {
        return this;
      })
    };
    const next = jest.fn();
    const { name } = await users.getById(1);
    const req = { body: { username: name } };
    await authController.getByUsername(req, res, next);
    expect(req.user.name).toContain(req.body.username);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("can hashPassword(req, res, next)", async () => {
    const req = { body: { password: "password" } };
    const res = {};
    const next = jest.fn();
    await authController.hashPassword(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body.password.length).toBeGreaterThan("password".length);
  });

  it("can isNewUsername(req, res, next)", async () => {
    const req = { body: { username: "SteveBarton87" } };
    const res = {};
    const next = jest.fn();
    const response = await authController.isNewUsername(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("can isValidPassword(req, res, next)", async () => {
    const req = { body: { password: "password" }, user: { password: null } };
    const res = {};
    const next = jest.fn();
    await authController.hashPassword(req, res, next);
    req.user.password = req.body.password;
    req.body.password = "password";
    await authController.isValidPassword(req, res, next);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it("can login(req, res)", async () => {
    const user = { id: 1, name: "test@test.com" };
    const session = { authenticated: false, user: null };
    const req = { user, session };
    const res = {
      status: jest.fn(function() {
        return this;
      }),
      json: jest.fn(function() {
        return this;
      })
    };
    await authController.login(req, res);
    expect(req.session.user).toMatchObject(user);
    expect(req.session.authenticated).toBeTruthy();
  });

  it("can register(req, res)", async () => {
    const body = { username: "test@test.com", password: "password" };
    const session = { authenticated: false, user: null };
    const req = { session, body };
    const status = jest.fn(function() {
      return this;
    });
    const json = jest.fn(function() {
      return this;
    });
    const res = { status, json };
    await authController.register(req, res);
    expect(session.authenticated).toBeTruthy();
    expect(session.user.name).toContain("test@test.com");
  });

  it("can logout(req, res)", async () => {
    const destroy = jest.fn();
    const session = { destroy };
    const req = { session };
    const res = {};
    await authController.logout(req, res);
    expect(destroy).toHaveBeenCalledTimes(1);
  });
});
