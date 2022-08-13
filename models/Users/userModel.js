const { number } = require("joi")
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    otp: String,
  },
  { timestamps: true }
)

const users = mongoose.model("Users", userSchema, "users")
module.exports = { User: users }
