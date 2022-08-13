const { default: mongoose } = require("mongoose")
const { Sockets } = require("../models/Chats/sockets")
// const { updateDoctorAvailabilityStatusService } = require("../doctorService")

const addUser = async ({ socketId, name, modelType }) => {
  try {
    const existingUser = await Sockets.exists({ name })

    if (existingUser) {
      await Sockets.deleteMany({ name: mongoose.Types.ObjectId(name) })
    }
    const user = new Sockets({ socketId, name, modelType })
    await user.save()
    return { success: true, data: user }
  } catch (err) {
    return { success: false, data: err }
  }
}

const removeUser = async (socketId) => {
  try {
    const { name } = await Sockets.findOne({ socketId })
    const user = await Sockets.deleteMany({
      name: mongoose.Types.ObjectId(name),
    })
    if (user.deletedCount > 0) {
      return { success: true, data: "user disconnected" }
    } else {
      return { success: false, data: "unable to remove user" }
    }
  } catch (err) {
    return { success: false, data: err }
  }
}

const getUser = async (name) => {
  return await Sockets.findOne({ name })
}

module.exports = { addUser, removeUser, getUser }
