const asyncHandler = require('express-async-handler')
const Chat = require('../model/chatModel')
const User = require('../model/userModel')
const getAllChat = asyncHandler(async (req, resp) => {})

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

const createGroupChat = asyncHandler(async (req, resp) => {})
const addToGroup = asyncHandler(async (req, resp) => {})
const renameGroupChat = asyncHandler(async (req, resp) => {})
const removeFromGroup = asyncHandler(async (req, resp) => {})

module.exports = { getAllChat, accessChat, createGroupChat, addToGroup, renameGroupChat, removeFromGroup }
