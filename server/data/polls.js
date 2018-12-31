const db = require("../../db");

const COLUMNS = {
  id: "id",
  created_at: "created_at",
  question: "question",
  creator: "creator",
  votes: "votes"
};

const ORDER = {
  asc: "ASC",
  desc: "DESC"
};

const getCount = options => {
  let base = `
    SELECT COUNT(*) AS count FROM polls
  `;
  const input = [];
  if (options.me && !options.filter) {
    base = base.concat(` WHERE polls.creator_id = ?`);
    input.push(options.me);
  }
  if (options.me && options.filter) {
    base = base.concat(
      ` WHERE polls.creator_id = ? AND LOWER(question) LIKE '${options.filter.toLowerCase()}%'`
    );
    input.push(options.me);
  }
  if (!options.me && options.filter) {
    base = base.concat(
      ` WHERE LOWER(question) LIKE '${options.filter.toLowerCase()}%'`
    );
  }
  if (input.length) {
    return db.query(base.concat(";"), input);
  }
  return db.query(base.concat(";"));
};

const createQuery = options => {
  let base = `
    SELECT poll.id AS id, question, poll.created_at, name AS creator, COUNT(votes.poll_id) AS votes FROM polls 
    AS poll 
    INNER JOIN users ON poll.creator_id = users.id
    LEFT JOIN votes ON poll.id = votes.poll_id
  `;
  const input = [];
  if (options.me && !options.filter) {
    base = base.concat(` WHERE poll.creator_id = ?`);
    input.push(options.me);
  }
  if (options.me && options.filter) {
    base = base.concat(
      ` WHERE poll.creator_id = ? AND LOWER(question) LIKE '${options.filter.toLowerCase()}%'`
    );
    input.push(options.me);
  }
  if (!options.me && options.filter) {
    base = base.concat(
      ` WHERE LOWER(question) LIKE '${options.filter.toLowerCase()}%'`
    );
  }
  base = base.concat(` GROUP BY id`);
  if (options.sort) {
    if (COLUMNS[options.sort] && ORDER[options.order]) {
      base = base.concat(
        ` ORDER BY ${COLUMNS[options.sort]} ${ORDER[options.order]}`
      );
    }
  }
  if (options.limit) {
    base = base.concat(` LIMIT ? OFFSET ?`);
    input.push(options.limit);
    input.push(options.offset);
  }
  return { string: base.concat(";"), input };
};

const parseResponse = response => Promise.resolve(response[0]);

const createMany = polls => {
  return db.query(
    `
    INSERT INTO polls (question, creator_id)
    VALUES ?;`,
    [polls]
  );
};

const createOne = poll => {
  return db.query(
    `
    INSERT INTO polls 
    SET ?;`,
    poll
  );
};

const getAll = options => {
  const { string, input } = createQuery(options);
  if (input.length) {
    return db.query(string, input);
  }
  return db.query(string);
};

const getById = id => {
  return db
    .query(
      `
    SELECT poll.id, question, name AS creator, poll.created_at FROM polls 
    AS poll
    INNER JOIN users ON poll.creator_id = users.id 
    WHERE poll.id = ?;`,
      [id]
    )
    .then(parseResponse);
};

const deleteOne = ({ poll_id, creator_id }) => {
  return db.query(
    `
    DELETE FROM polls WHERE polls.id = ? AND polls.creator_id = ?;`,
    [poll_id, creator_id]
  );
};

module.exports = {
  getCount,
  createMany,
  getAll,
  createOne,
  getById,
  deleteOne
};
