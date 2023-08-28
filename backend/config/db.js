const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB connected successfully ${connect.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

module.exports = connectDb;