class Observable {
  constructor() {
    this.observers = {};
  }
  subscribe(id, handler) {
    if (!this.observers[id]) {
      this.observers[id] = handler;
    }
  }
  unsubscribe(id) {
    if (this.observers[id]) {
      delete this.observers[id];
    }
  }
  notify(id, data) {
    if (this.observers[id]) {
      this.observers[id](data);
    }
  }
}

module.exports = Observable;
