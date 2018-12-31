const polls = require("../data/polls");
const choices = require("../data/choices");
const votes = require("../data/votes");

const buildQuery = req => {
  const options = {
    filter: null,
    sort: null,
    order: null,
    limit: 20,
    offset: 0
  };
  options.filter = req.query.filter ? req.query.filter : options.filter;
  options.sort = req.query.sort ? req.query.sort : options.sort;
  options.order = req.query.order ? req.query.order : options.order;
  options.limit = req.query.limit ? parseInt(req.query.limit) : options.limit;
  options.offset = req.query.offset
    ? parseInt(req.query.offset)
    : options.offset;

  return options;
};

exports.getAll = (req, res) => {
  const options = buildQuery(req);
  const getPolls = () => polls.getAll(options);
  const getCount = () => polls.getCount(options);
  return Promise.all([getPolls(), getCount()]).then(
    ([collection, [{ count }]]) => Promise.resolve({ collection, count })
  );
};

exports.getMe = (req, res) => {
  const options = buildQuery(req);
  options.me = req.session.user.id;
  const getPolls = () => polls.getAll(options);
  const getCount = () => polls.getCount(options);
  return Promise.all([getPolls(), getCount()]).then(
    ([collection, [{ count }]]) => Promise.resolve({ collection, count })
  );
};

exports.getById = (req, res) => {
  const id = req.params.id;

  return Promise.all([polls.getById(id), choices.getAllByPollId(id)]).then(
    ([poll, choices]) =>
      poll
        ? Promise.resolve({ ...poll, choices })
        : Promise.reject({ message: "Unable to get poll" })
  );
};

exports.createOne = (req, res) => {
  const question = req.body.question;
  const creator_id = req.session.user.id;
  const poll = { question, creator_id };
  const pollChoices = req.body.choices;

  return polls
    .createOne(poll)
    .then(response =>
      choices
        .createMany(pollChoices.map(c => [c, response.insertId]))
        .then(() => Promise.resolve(response.insertId))
    )
    .then(id => polls.getById(id))
    .then(poll => Promise.resolve({ ...poll, votes: 0 }));
};

exports.updateOne = (req, res) => {
  const choice_id = req.body.choice_id;
  const poll_id = req.params.id;
  const voter_id = req.session.user.id;

  return votes.createOne({ choice_id, poll_id, voter_id });
};

exports.deleteOne = (req, res) => {
  const poll_id = req.params.id;
  const creator_id = req.session.user.id;
  return polls.deleteOne({ poll_id, creator_id });
};
