const asyncHandler = require('express-async-handler')
const getAllChat = asyncHandler(async (req, resp) => {})

const accessChat = asyncHandler(async (req, resp) => {})

const createGroupChat = asyncHandler(async (req, resp) => {})
const addToGroup = asyncHandler(async (req, resp) => {})
const renameGroupChat = asyncHandler(async (req, resp) => {})
const removeFromGroup = asyncHandler(async (req, resp) => {})

module.exports = { getAllChat, accessChat, createGroupChat, addToGroup, renameGroupChat, removeFromGroup }
