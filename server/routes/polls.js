const express = require("express");
const pollsController = require("../controllers/polls");
const async = require("../middleware/async");
const { validateCreatePoll, validateUpdatePoll } = require("../validation");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router
  .route("/")
  .get(async.toClient(pollsController.getAll))
  .post(
    requireAuth,
    async.next(validateCreatePoll),
    async.toClient(pollsController.createOne)
  );

router.route("/me").get(requireAuth, async.toClient(pollsController.getMe));

router
  .route("/:id")
  .get(requireAuth, async.toClient(pollsController.getById))
  .put(
    requireAuth,
    async.next(validateUpdatePoll),
    async.toClient(pollsController.updateOne)
  )
  .delete(requireAuth, async.toClient(pollsController.deleteOne));

module.exports = router;
