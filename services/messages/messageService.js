const { default: mongoose } = require("mongoose")
const { Chat, GroupChat } = require("../../models/Chats/chat")
const { User } = require("../../models/Users/userModel")

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

const tipUserService = async ({ param, body }) => {
  const { recipientId, amount } = body
  //Get sender details and confirm sender has sufficient money in wallet
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(param) })

  if (!user) {
    throw Error("User not found")
  }

  if (user.wallet < amount) {
    throw Error("Insufficient funds")
  }

  user.wallet -= amount

  const recipient = await User.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(recipientId),
    },
    { $inc: { wallet: amount } },
    { returnDocument: true, rawResult: true }
  )

  if (!recipient || !recipient?.lastErrorObject.updatedExisting) {
    throw Error("Recipient not found")
  }

  await user.save()
  return { success: true, response: "User successfully tipped" }
}

module.exports = {
  getUserMessagesService,
  getGroupMessagesService,
  tipUserService,
}
