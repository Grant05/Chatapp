const Chat = require('./chatModel')

const chatController = {};

chatController.postMessage = (req, res) => {
  Chat.create(req.body, (err, text) => {
    if (err) throw err;
    if (text) {
      res.send(text)
    }
  })
}

chatController.getMessages = (req, res) => {
  Chat.find({}, (err, messages) => {
    if (err) throw err;
    if (messages) {
      res.send(messages)
    }
  })
}

chatController.deleteMessage = (req, res) => {
  Chat.findByIdAndRemove(req.params.messageID, (err, message) => {
    if (err) throw err;
    if (message) {
      res.send(message)
    }
  })
}

chatController.editMessage = (req, res) => {
  Chat.findByIdAndUpdate(req.params.messageID, req.body, (err, message) => {
    if (err) throw err;
    message.text = req.body.text
    res.send(message)
  })
}

module.exports = chatController;
