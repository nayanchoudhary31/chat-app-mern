const express = require('express')
const router = express.Router()
const { userRegister, loginUserAuth, getAllUser } = require('../controller/userController')
const authToken = require('../middleware/authMiddleware')

router.route('/').post(userRegister).get(authToken, getAllUser)
router.route('/login').post(loginUserAuth)

module.exports = router
