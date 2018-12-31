const createContext = require("./createContext");

module.exports = renderer => (req, res) => {
  const context = createContext(req);
  renderer.renderToString(context, (error, html) => {
    if (error) {
      res.status(500).json(error);
    }
    res.send(html);
  });
};
