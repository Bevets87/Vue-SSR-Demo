const users = require("../data/users");

exports.getMe = (req, res) => {
  return users
    .getById(req.session.user.id)
    .then(user =>
      user
        ? Promise.resolve(user)
        : Promise.reject({ message: "Unable to get user" })
    );
};

exports.updateMe = (req, res) => {
  const update = {
    name: req.body.username,
    password: req.body.password
  };
  return users.updateOne(req.session.user.id, update);
};

exports.deleteMe = (req, res) => {
  return users.deleteOne(req.session.user.id);
};
