const createPollsTable = () => `
  CREATE TABLE IF NOT EXISTS polls (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    question TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    creator_id INT NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES users(id) ON DELETE CASCADE
  );
`

module.exports = createPollsTable 




