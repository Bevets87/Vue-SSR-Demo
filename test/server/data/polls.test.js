const polls = require("../../../server/data/polls");
const { setupDB, cleanupDB, seedDB } = require("../helpers");

describe("Polls Table", () => {
  beforeAll(done => {
    setupDB()
      .then(() => seedDB())
      .then(() => done());
  });

  afterAll(done => {
    cleanupDB().then(() => done());
  });

  it("can getAll(options) paginated with id, created_at, creator, question, and votes fields", done => {
    const options = {
      limit: 10,
      offset: 0
    };
    polls.getAll(options).then(polls => {
      expect(polls.length).toEqual(10);
      done();
    });
  });

  it("can getPollById(id) with id and question fields", done => {
    polls.getById(1).then(poll => {
      expect(poll.id).toEqual(1);
      expect(poll.question).toBeTruthy();
      done();
    });
  });

  it("can getAll(options) sorted by newest with id, created_at, creator, question, and votes fields", done => {
    const options = {
      sort: "created_at",
      order: "desc",
      limit: 10,
      offset: 0
    };
    polls.getAll(options).then(polls => {
      expect(polls.length).toEqual(10);
      expect(polls[0].id).toBe(10);
      expect(polls[0].created_at).toBeTruthy();
      expect(polls[0].question).toBeTruthy();
      expect(polls[0].creator).toBeTruthy();

      done();
    });
  });

  it("can getAll(options) sorted by oldest with id, created_at, creator, question, and votes fields", done => {
    const options = {
      sort: "created_at",
      order: "asc",
      limit: 10,
      offset: 0
    };
    polls.getAll(options).then(polls => {
      expect(polls.length).toEqual(10);
      expect(polls[0].id).toBe(1);
      expect(polls[0].created_at).toBeTruthy();
      expect(polls[0].question).toBeTruthy();
      expect(polls[0].creator).toBeTruthy();

      done();
    });
  });

  it("can getAll(options) by most votes with id, created_at, creator, question, and votes fields", done => {
    const options = {
      sort: "votes",
      order: "desc",
      limit: 10,
      offset: 0
    };
    polls.getAll(options).then(polls => {
      expect(polls.length).toEqual(10);
      expect(polls[0].id).toBeTruthy();
      expect(polls[0].created_at).toBeTruthy();
      expect(polls[0].question).toBeTruthy();
      expect(polls[0].creator).toBeTruthy();

      done();
    });
  });

  it("can getAll(options) by least votes with id, created_at, creator, question, and votes fields", done => {
    const options = {
      sort: "votes",
      order: "asc",
      limit: 10,
      offset: 0
    };
    polls.getAll(options).then(polls => {
      expect(polls.length).toEqual(10);
      expect(polls[0].id).toBeTruthy();
      expect(polls[0].created_at).toBeTruthy();
      expect(polls[0].question).toBeTruthy();
      expect(polls[0].creator).toBeTruthy();
      expect(polls[0].votes).toBeLessThan(polls[9].votes);
      done();
    });
  });

  it("can getAll(options) by search term with id, created_at, creator, question, and votes fields", done => {
    const options = {
      filter: "A",
      limit: 10,
      offset: 0
    };
    polls.getAll(options).then(polls => {
      expect(polls.length).toBeGreaterThan(0);
      done();
    });
  });
});
