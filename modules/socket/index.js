const { addUser, getUser, removeUser } = require("../../utils/socket")
// const { sendChatService } = require("../../services/centralService/chat")
const mongoose = require("mongoose")
const { Conversation } = require("../../models/Chats/chat")
const fs = require("fs")

module.exports.socketConnection = async (io) => {
  io.on("connection", async (socket) => {
    socket.on("join", async (obj) => {
      const { success, data } = await addUser({
        socketId: socket.id,
        name: obj.name,
        modelType: obj.type,
      })
      if (!success) {
        socket.emit("join", `Error: ${data.message}`)
      } else {
        socket.emit("join", "Connection Successful")
      }
    })

    socket.on("join-group", async (obj) => {
      const user =
        obj.sender == "Users"
          ? await getUser(obj.doctorId)
          : await getUser(obj.userId)
      socket.join("justin bieber fans")
    })

    socket.on("group-message", async (obj) => {
      const user =
        obj.sender == "Users"
          ? await getUser(obj.doctorId)
          : await getUser(obj.userId)
      socket.to("some room").emit("some event")
    })

    socket.on("private-message", async (obj) => {
      try {
        const receiver =
          obj.sender == "Users"
            ? await getUser(obj.doctorId)
            : await getUser(obj.userId)

        let conversationId
        let conversation = await Conversation.findOne({
          $and: [{ userId: obj.userId }, { doctorId: obj.doctorId }],
        })

        if (conversation == null) {
        } else conversationId = conversation._id

        if (obj.message.trim().length === 0) {
          throw Error("Error saving chat")
        }

        // await sendChatService(
        //   {
        //     conversationId,
        //     message: obj.message,
        //     userId: obj.userId,
        //     doctorId: obj.doctorId,
        //     sender: obj.sender,
        //   },
        //   (result) => {
        //     if (result.status === false) {
        //       throw new Error("Something went wrong saving the chat...")
        //     }
        //   }
        // )

        socket.to(receiver.socketId).emit("private-message", obj.message)
      } catch (err) {
        fs.writeFileSync("errorlog.txt", `Error: ${err.message} /n`)
      }
    })

    socket.on("disconnect", async () => {
      await removeUser(socket.id)
    })

    socket.on("session-ended", async (payload) => {
      const { doctorId, bookingId, chatType } = payload
    })

    socket.on("error", (error) => {
      fs.writeFileSync("errorlog.txt", `Error: ${error.message} /n`)
    })
  })
}
