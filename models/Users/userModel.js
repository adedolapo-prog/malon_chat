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
    otp: String,
  },
  { timestamps: true }
)

const users = mongoose.model("Users", userSchema, "users")
module.exports = { User: users }
