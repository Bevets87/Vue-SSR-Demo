const validation = require("../../../server/validation");

describe("Validation", () => {
  it("can validate registration schema", async () => {
    const registrationInfo = {
      username: "test@test.com",
      password: "password",
      passwordConfirmation: "password"
    };
    const req = { body: registrationInfo };
    const res = {};
    const response = await validation.validateRegistration(req, res);
    expect(response).toMatchObject(registrationInfo);
  });

  it("can invalidate registration schema", async () => {
    const registrationInfo = {
      username: "test@test.com",
      password: "password",
      passwordConfirmation: "passwordssdf"
    };
    const req = { body: registrationInfo };
    const res = {};
    try {
      const response = await validation.validateRegistration(req, res);
    } catch (error) {
      expect(error.message).toContain(
        '"Password Confirmation" must match "Password"'
      );
    }
  });

  it("can validate login schema", async () => {
    const loginInfo = { username: "test@test.com", password: "password" };
    const req = { body: loginInfo };
    const res = {};
    const response = await validation.validateLogin(req, res);
    expect(response).toMatchObject(loginInfo);
  });

  it("can invalidate login schema", async () => {
    const loginInfo = { username: "test@test.com", password: null };
    const req = { body: loginInfo };
    const res = {};
    try {
      const response = await validation.validateLogin(req, res);
    } catch (error) {
      expect(error.message).toContain("must be a string");
    }
  });

  it("can validate create poll schema", async () => {
    const createPollInfo = {
      question: "What is the best sport?",
      choices: ["soccer", "baseball", "basketball"]
    };
    const req = { body: createPollInfo };
    const res = {};
    const response = await validation.validateCreatePoll(req, res);
    expect(response).toMatchObject(createPollInfo);
  });

  it("can invalidate create poll schema", async () => {
    const createPollInfo = {
      question: "What is the best sport?",
      choices: [1, 2, 3]
    };
    const req = { body: createPollInfo };
    const res = {};
    try {
      const response = await validation.validateCreatePoll(req, res);
    } catch (error) {
      expect(error.message).toContain("must be a string");
    }
  });

  it("can validate update poll schema", async () => {
    const updatePollInfo = { choice_id: 1 };
    const req = { body: updatePollInfo };
    const res = {};
    const response = await validation.validateUpdatePoll(req, res);
    expect(response).toMatchObject(updatePollInfo);
  });

  it("can invalidate update poll schema", async () => {
    const updatePollInfo = { choice_id: "one" };
    const req = { body: updatePollInfo };
    const res = {};
    try {
      const response = await validation.validateUpdatePoll(req, res);
    } catch (error) {
      expect(error.message).toContain("must be a number");
    }
  });
});
