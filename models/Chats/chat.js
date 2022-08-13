const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const groupChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

const Chat = mongoose.model("Chat", chatSchema, "chat")
const GroupChat = mongoose.model("GroupChat", groupChatSchema, "groupChat")
const Conversation = mongoose.model(
  "Conversation",
  conversationSchema,
  "conversation"
)
module.exports = { Chat, Conversation, GroupChat }
