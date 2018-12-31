const express = require("express");
const authController = require("../controllers/auth");
const async = require("../middleware/async");
const { validateRegistration, validateLogin } = require("../validation");

const router = express.Router();

router
  .route("/register")
  .post(
    async.next(validateRegistration),
    authController.isNewUsername,
    authController.hashPassword,
    authController.register
  );

router
  .route("/login")
  .post(
    async.next(validateLogin),
    authController.getByUsername,
    authController.isValidPassword,
    authController.login
  );

router.route("/logout").post(authController.logout);

module.exports = router;
