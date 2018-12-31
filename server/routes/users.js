const express = require('express')
const usersController = require('../controllers/users')
const async = require('../middleware/async')


const router = express.Router()

router.route('/me')
.get(async.toClient(usersController.getMe))
.post(async.toClient(usersController.updateMe))

router.route('/me/delete')
.post(async.toClient(usersController.deleteMe))

  
module.exports = router 