const createChoicesTable = () => `
  CREATE TABLE IF NOT EXISTS choices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value TEXT NOT NULL,
    poll_id INT NOT NULL,
    FOREIGN KEY(poll_id) REFERENCES polls(id) ON DELETE CASCADE
  );
`

module.exports = createChoicesTable 
