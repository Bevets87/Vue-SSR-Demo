const db = require("../../db");

const toClient = query => (...args) => {
  return query.apply(null, args).then(({ insertId }) => getById(insertId));
};

const parseResponse = response => Promise.resolve(response[0]);

const createOne = user => {
  return db.query(
    `
    INSERT INTO users
    SET ?;`,
    user
  );
};

const createMany = users => {
  return db.query(
    `
    INSERT INTO users (name, password)
    VALUES ?;`,
    [users]
  );
};

const getById = id => {
  return db
    .query(
      `
    SELECT id, name, password FROM users 
    AS user
    WHERE user.id = ?;
  `,
      [id]
    )
    .then(parseResponse);
};

const deleteOne = id => {
  return db.query(
    `
    DELETE FROM users
    WHERE users.id = ?;`,
    [id]
  );
};

const getAll = (limit, offset) => {
  return db.query(
    `
    SELECT id, name FROM users
    LIMIT ? OFFSET ?;`,
    [limit, offset]
  );
};

const updateOne = (id, update) => {
  return db.query(
    `
    UPDATE users
    SET name=?, password=?
    WHERE users.id = ?;`,
    [update.name, update.password, id]
  );
};

const getByUsername = username => {
  return db
    .query(
      `
    SELECT id, name, password FROM users 
    AS user 
    WHERE user.name = ?;`,
      [username]
    )
    .then(parseResponse);
};

module.exports = {
  createOne: toClient(createOne),
  getById,
  deleteOne,
  getAll,
  updateOne,
  createMany,
  getByUsername
};
