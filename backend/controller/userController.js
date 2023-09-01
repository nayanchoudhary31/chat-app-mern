const { generateToken } = require('../config/generateToken')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const userRegister = asyncHandler(async (req, resp) => {
  const { name, email, password, pic } = req.body

  if (!name || !email || !password) {
    resp.status(400)
    throw new Error('All fields are mandatory!')
  }

  const isUserExist = await User.findOne({ email })
  if (isUserExist) {
    resp.status(400)
    throw new Error('User already exist!')
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  })

  if (user) {
    resp.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    })
  } else {
    resp.status(400)
    throw new Error('User not found')
  }
})

const loginUserAuth = asyncHandler(async (req, resp) => {
  const { email, password } = req.body

  if (!email || !password) {
    resp.status(400)
    throw new Error('Email & Password is required !')
  }

  const user = await User.findOne({ email })

  if (user && user.validatePassword(password)) {
    resp.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    })
  } else {
    resp.status(401)
    throw new Error('Invalid Email or Password')
  }
})

// Query
// api/user?search=nayan&lastname=choudhary
const getAllUser = asyncHandler(async (req, resp) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {}

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
  resp.send(users)
})

module.exports = { userRegister, loginUserAuth, getAllUser }
