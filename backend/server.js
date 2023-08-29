const express = require('express')
const app = express()
const connectDb = require('./config/db')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const { chats } = require('./data/chat')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
connectDb()
app.use(express.json())
const PORT = process.env.PORT

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`)
})
