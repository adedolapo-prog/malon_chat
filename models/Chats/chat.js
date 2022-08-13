const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    timer: Date,
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
        required: true
    },
    client: {
        type: String,
        enum: ["User", "Staff"],
        default: "User"
    },
    enterpriseCode: String,
    videoMeetingDetails: Object
}, { timestamps: true })

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Doctors"
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversations",
        required: true
    },
    sender: {
        type: String,
        required: true,
        enum: ["Users", "Doctors"]
    },
    message: {
        type: String,
        trim: true
    },
    attachment: {
        type: String
    }
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema, "chat")
const Conversation = mongoose.model("Conversation", conversationSchema, "conversation")
module.exports = { Chat, Conversation }