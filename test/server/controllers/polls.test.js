const pollsController = require("../../../server/controllers/polls");
const { setupDB, cleanupDB, seedDB } = require("../helpers");
const users = require("../../../server/data/users");

describe("Polls Controller", () => {
  beforeAll(done => {
    setupDB()
      .then(() => seedDB())
      .then(() => done());
  });

  afterAll(done => {
    cleanupDB().then(() => done());
  });

  it("can getById(req, res) with a response of id, question, creator, created_at and choices fields", done => {
    const req = { params: { id: 1 } };
    const res = {};
    pollsController.getById(req, res).then(poll => {
      expect(poll.id).toEqual(1);
      expect(poll.choices.length).toBeTruthy();
      expect(poll.question).toBeTruthy();
      expect(poll.creator).toBeTruthy();
      done();
    });
  });

  it("can createOne(req, res) with a response of id, question, created_at, creator, and votes fields", done => {
    const question = "What is the best programming language?";
    const choices = ["Javascript", "Python", "Java", "C++"];
    const user = { id: 1 };
    const session = { user };
    const req = { body: { question, choices }, session };
    const res = {};
    pollsController.createOne(req, res).then(poll => {
      expect(poll.question).toContain(question);
      expect(poll.id).toBeTruthy();
      expect(poll.created_at).toBeTruthy();
      expect(poll.creator).toBeTruthy();
      expect(poll.votes).toEqual(0);
      done();
    });
  });

  it("can getAll(req, res) each with a response of id, question, created_at, creator, and votes fields", done => {
    const req = { query: {} };
    const res = {};
    pollsController.getAll(req, res).then(response => {
      expect(response.count).toEqual(11);
      expect(response.collection[0].id).toBeTruthy();
      expect(response.collection[0].created_at).toBeTruthy();
      expect(response.collection[0].creator).toBeTruthy();
      expect(typeof response.collection[0].votes).toBe("number");
      done();
    });
  });

  it("can getMe(req, res)", done => {
    const query = {};
    const user = { id: 1 };
    const session = { user };
    const req = { query: {}, session };
    const res = {};

    pollsController
      .getMe(req, res)
      .then(response =>
        users.getById(1).then(user => Promise.resolve({ user, response }))
      )
      .then(({ response, user }) => {
        expect(response.collection[0].creator).toContain(user.name);
        done();
      });
  });

  it("can deleteOne(req, res)", done => {
    const user = { id: 10 };
    const session = { user };
    const req = { params: { id: 1 }, session };
    const res = {};

    pollsController
      .deleteOne(req, res)
      .then(() => pollsController.getById(req, res))
      .catch(response => {
        expect(response.message).toContain("Unable to get poll");
        done();
      });
  });

  it("can updateOne(req, res) with a response of id, question, created_at, creator, and updated choices.votes fields", done => {
    const pollId = 2;
    const voterId = 1;
    const choiceId = 4;
    const req = {
      params: { id: pollId },
      body: { choice_id: choiceId },
      session: { user: { id: voterId } }
    };
    const res = {};
    pollsController
      .getById({ params: { id: 2 } }, {})
      .then(poll => {
        return pollsController
          .updateOne(req, res)
          .then(() => Promise.resolve(poll));
      })
      .then(poll => {
        pollsController.getById({ params: { id: 2 } }, {}).then(response => {
          const choice = poll.choices.filter(c => c.id == 4)[0];
          const updatedChoice = response.choices.filter(c => c.id == 4)[0];

          expect(updatedChoice.votes).toBeGreaterThan(choice.votes);
          done();
        });
      });
  });
});
