const users = require("../data/users");
const bcrypt = require("bcrypt");

exports.hashPassword = (req, res, next) => {
  const textPassword = req.body.password;
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(textPassword, salt))
    .then(hash => {
      req.body.password = hash;
      next();
    })
    .catch(error => res.status(500).json(error));
};

exports.isNewUsername = (req, res, next) => {
  const name = req.body.username;
  return users
    .getByUsername(name)
    .then(user => (!user ? Promise.resolve() : Promise.reject()))
    .then(() => {
      next();
    })
    .catch(() => res.status(400).json({ message: "Username already exists" }));
};

exports.getByUsername = (req, res, next) => {
  const name = req.body.username;
  return users
    .getByUsername(name)
    .then(user => (user ? Promise.resolve(user) : Promise.reject()))
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error =>
      res
        .status(400)
        .json({ ...error, message: "Invalid username or password" })
    );
};

exports.isValidPassword = (req, res, next) => {
  const textPassword = req.body.password;
  return bcrypt.compare(textPassword, req.user.password).then(isValid => {
    if (isValid) {
      next();
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  });
};

exports.register = (req, res) => {
  const userInfo = {
    name: req.body.username,
    password: req.body.password
  };
  return users
    .createOne(userInfo)
    .then(({ id, name }) => {
      req.session.user = { id, name };
      req.session.authenticated = true;
      res.status(200).json(req.session.user);
    })
    .catch(error => res.status(500).json(error));
};

exports.login = (req, res) => {
  req.session.user = { id: req.user.id, name: req.user.name };
  req.session.authenticated = true;
  res.status(200).json(req.session.user);
};

exports.logout = (req, res) => {
  req.session.destroy(error => {
    if (error) return res.status(500).json(error);
    res.status(200).json({ ok: true });
  });
};
