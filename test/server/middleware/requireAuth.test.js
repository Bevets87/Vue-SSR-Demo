const requireAuth = require("../../../server/middleware/requireAuth");

describe("Require Auth Middleware", () => {
  it("can requireAuth(req, res, next) and succeed", () => {
    const session = { authenticated: true };
    const req = { session };
    const res = {};
    const next = jest.fn();
    requireAuth(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("can requireAuth(req, res, next) and fail", () => {
    const session = { authenticated: false };
    const req = { session };
    const res = {
      status: jest.fn(function() {
        return this;
      }),
      json: jest.fn(function() {
        return this;
      })
    };
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });
});
