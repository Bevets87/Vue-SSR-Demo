exports.choices = () => `
  INSERT INTO choices (value, poll_Id)
  VALUES ?;
`;

exports.users = () => `
  INSERT INTO users (name, password)
  VALUES ?;
`;

exports.polls = () => `
  INSERT INTO polls (question, creator_id)
  VALUES ?;
`;

exports.votes = () => `
  INSERT INTO votes (choice_id, poll_id, voter_id)
  VALUES ?;
`;
