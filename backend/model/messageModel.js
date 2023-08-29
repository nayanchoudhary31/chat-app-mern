const mongoose = require('mongoose')
const messageModel = mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
  content: { type: String, trim: true },
  chat: { type: mongoose.Schema.ObjectId, ref: 'Chat' },
})
//Sender
// Content
// Chat Reference
const Message = mongoose.model('Message', messageModel)
module.exports = Message
