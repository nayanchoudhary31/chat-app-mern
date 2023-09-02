const express = require('express')
const router = express.Router()
const authToken = require('../middleware/authMiddleware')
const {
  getAllChat,
  accessChat,
  createGroupChat,
  addToGroup,
  renameGroupChat,
  removeFromGroup,
} = require('../controller/chatController')

router.route('/').get(authToken, getAllChat)
router.route('/').post(authToken, accessChat)

router.route('/group').post(authToken, createGroupChat)
router.route('/groupadd').put(authToken, addToGroup)
router.route('/rename').put(authToken, renameGroupChat)
router.route('/groupremove').put(authToken, removeFromGroup)

module.exports = router
