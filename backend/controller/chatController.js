const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const getAllChat = asyncHandler(async (req, resp) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name pic email',
        })
        resp.status(200).send(results)
      })
  } catch (error) {
    resp.status(400)
    throw new Error(error.message)
  }
})

const accessChat = asyncHandler(async (req, resp) => {
  const { userId } = req.body

  if (!userId) {
    console.log(`UserId params not sent with request`)
    return resp.sendStatus(400)
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage')

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  })

  if (isChat.length > 0) {
    resp.send(isChat[0])
  } else {
    var chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user, userId],
    }
  }

  try {
    const createdChat = await Chat.create(chatData)
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password')
    resp.status(200).json(fullChat)
  } catch (error) {
    resp.status(400)
    throw new Error(error.message)
  }
})

const createGroupChat = asyncHandler(async (req, resp) => {
  if (!req.body.users || !req.body.name) {
    resp.status(404).send({ message: 'All fields are required !' })
  }

  // Send the users array in string from frontend

  var users = JSON.parse(req.body.users)

  if (users.length < 2) {
    resp.status(404)
    send('More than 2 users are required to form a group chat')
  }

  users.push(req.user)

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    })
    const fullChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    resp.status(200).json(fullChat)
  } catch (error) {
    resp.status(400)
    throw new Error(error.message)
  }
})
const addToGroup = asyncHandler(async (req, resp) => {})
const renameGroupChat = asyncHandler(async (req, resp) => {})
const removeFromGroup = asyncHandler(async (req, resp) => {})

module.exports = { getAllChat, accessChat, createGroupChat, addToGroup, renameGroupChat, removeFromGroup }
