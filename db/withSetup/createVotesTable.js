const createVotesTable = () => `
  CREATE TABLE IF NOT EXISTS votes (
    poll_id INT NOT NULL,
    voter_id INT NOT NULL, 
    choice_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY(voter_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(choice_id) REFERENCES choices(id) ON DELETE CASCADE,
    PRIMARY KEY(voter_id, poll_id)
  );
`

module.exports = createVotesTable 
