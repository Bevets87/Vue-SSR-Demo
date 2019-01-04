module.exports = req => {
  const context = {
    url: req.url,
    authenticated: !!req.session.authenticated,
    headers: { cookie: req.get("cookie") || "" }
  };

  return context;
};
