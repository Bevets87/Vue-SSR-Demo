class Database {
  constructor(impl) {
    this.impl = impl;
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.impl.connect(error => {
        if (error) reject(error);
        console.log(
          `${this.impl.config.database} connected to: ${this.impl.config.host}`
        );
        resolve();
      });
    });
  }
  disconnect() {
    return new Promise((resolve, reject) => {
      this.impl.end(error => {
        if (error) reject(error);
        console.log(
          `${this.impl.config.database} disconnected from: ${
            this.impl.config.host
          }`
        );
        resolve();
      });
    });
  }
  query(sql, args = null) {
    return new Promise((resolve, reject) => {
      this.impl.query(sql, args, (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
}

module.exports = Database;
