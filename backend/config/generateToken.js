const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
}
module.exports = { generateToken }
