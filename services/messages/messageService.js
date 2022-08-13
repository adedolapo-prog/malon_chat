const { default: mongoose } = require("mongoose")
const { Chat, GroupChat } = require("../../models/Chats/chat")

const getUserMessagesService = async (param, user) => {
  const messages = await Chat.find({
    $and: [
      {
        $or: [
          { sender: mongoose.Types.ObjectId(param) },
          { receiver: mongoose.Types.ObjectId(param) },
        ],
      },
      {
        $or: [
          { sender: mongoose.Types.ObjectId(user) },
          { receiver: mongoose.Types.ObjectId(user) },
        ],
      },
    ],
  })

  if (messages.length === 0) {
    throw Error("No messages found")
  }

  return { success: true, response: "Messages successfully fetched", messages }
}

const getGroupMessagesService = async (param) => {
  const messages = await GroupChat.find({ groupId: param })

  if (messages.length === 0) {
    throw Error("No messages found")
  }

  return { success: true, response: "Messages successfully fetched", messages }
}

module.exports = { getUserMessagesService, getGroupMessagesService }
