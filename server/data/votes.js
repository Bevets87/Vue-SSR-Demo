const db = require("../../db");

const createMany = votes => {
  return db.query(
    `
    INSERT INTO votes (choice_id, poll_id, voter_id)
    VALUES ?;`,
    [votes]
  );
};

const createOne = vote => {
  return db.query(
    `
    INSERT INTO votes 
    SET ?;`,
    vote
  );
};

const getAllByChoiceId = id => {
  return db.query(
    `
    SELECT * from votes
    WHERE votes.choice_id = ?
    ORDER BY voter_id ASC;`,
    [id]
  );
};

const getAllByPollId = id => {
  return db.query(
    `
    SELECT * FROM votes 
    WHERE votes.poll_id = ?
    ORDER BY voter_id ASC;`,
    [id]
  );
};

const getAllByVoterId = id => {
  return db.query(
    `
    SELECT * FROM votes 
    WHERE votes.voter_id = ?
    ORDER BY poll_id ASC;`,
    [id]
  );
};

module.exports = {
  createMany,
  createOne,
  getAllByChoiceId,
  getAllByPollId,
  getAllByVoterId
};
