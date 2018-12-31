module.exports = req => {
  const context = {
    url: req.url,
    authenticated: !!req.session.authenticated,
    headers: req.headers
  };

  return context;
};
