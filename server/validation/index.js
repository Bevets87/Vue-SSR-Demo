const joi = require("joi");

const promisfy = validation => (req, res) => {
  const { error, value } = validation(req, res);
  if (error) {
    return Promise.reject({ message: error.details[0].message });
  }
  return Promise.resolve(value);
};

const registrationSchema = {
  username: joi
    .string()
    .min(5)
    .max(255)
    .required()
    .label("Username"),
  password: joi
    .string()
    .min(5)
    .max(255)
    .required()
    .label("Password"),
  passwordConfirmation: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .label("Password Confirmation")
    .options({
      language: {
        any: {
          allowOnly: 'must match "Password"'
        }
      }
    })
};

const loginSchema = {
  username: joi
    .string()
    .min(5)
    .max(255)
    .required()
    .label("Username"),
  password: joi
    .string()
    .min(5)
    .max(255)
    .required()
    .label("Password")
};

const createPollSchema = {
  question: joi
    .string()
    .required()
    .label("Question"),
  choices: joi
    .array()
    .items(
      joi
        .string()
        .required()
        .label("Choice")
    )
    .required()
};

const updatePollSchema = {
  choice_id: joi
    .number()
    .required()
    .label("Choice Id")
};

module.exports = {
  validateRegistration: promisfy((req, res) =>
    joi.validate(req.body, registrationSchema)
  ),
  validateLogin: promisfy((req, res) => joi.validate(req.body, loginSchema)),
  validateCreatePoll: promisfy((req, res) =>
    joi.validate(req.body, createPollSchema)
  ),
  validateUpdatePoll: promisfy((req, res) =>
    joi.validate(req.body, updatePollSchema)
  )
};
