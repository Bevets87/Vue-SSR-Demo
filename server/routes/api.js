const express = require("express");
const pollsRouter = require("./polls");
const usersRouter = require("./users");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use("/polls", pollsRouter);
router.use("/users", requireAuth, usersRouter);

module.exports = router;
