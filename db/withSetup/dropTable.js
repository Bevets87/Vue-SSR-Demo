const dropTable = table => `
  DROP TABLE IF EXISTS ${table};
`;

module.exports = dropTable;
