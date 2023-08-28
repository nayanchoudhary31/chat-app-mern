const express = require('express')
const app = express()
const connectDb = require('./config/db')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const { chats } = require('./data/chat')
connectDb()
app.use(express.json())
const PORT = process.env.PORT

app.get('/', (req, resp) => {
  resp.json({ message: 'API is running' })
})

app.get('/api/chats', (req, resp) => {
  resp.send(chats)
})
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`)
})
