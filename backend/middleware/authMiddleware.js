const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
require('dotenv').config()

const authToken = asyncHandler(async (req, resp, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // decode the token and get the user detail
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await User.findById(decoded.userId).select('-passoword')

      next()
    } catch (error) {
      resp.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    resp.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = authToken
