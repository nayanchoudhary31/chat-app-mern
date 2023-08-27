const express = require('express')
const router = express.Router()
const { userRegister, loginUserAuth } = require('../controller/userController')

router.route('/').post(userRegister)
router.route('/login').post(loginUserAuth)

module.exports = router
