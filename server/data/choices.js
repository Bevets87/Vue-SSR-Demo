const db = require("../../db");

const createMany = choices => {
  return db.query(
    `
    INSERT INTO choices (value, poll_id)
    VALUES ?;`,
    [choices]
  );
};

const getAllByPollId = id => {
  return db.query(
    `
    SELECT id, value, COUNT(voter_id) AS votes FROM choices
    AS choice 
    LEFT JOIN votes ON choice.id = votes.choice_id 
    WHERE choice.poll_id = ?
    GROUP BY id;`,
    [id]
  );
};

module.exports = {
  createMany,
  getAllByPollId
};
