const { addUser, getUser, removeUser } = require("../../utils/socket")
const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")
const { Conversation, Chat, GroupChat } = require("../../models/Chats/chat")
const fs = require("fs")

module.exports.socketConnection = async (io) => {
  io.on("connection", async (socket) => {

    //join socket must be called as soon as the connection is made in order to save the user's socketId to the database and easily target the user for private messages
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

    //create group can be called when a user wants to have a group chat
    socket.on("create-group", async (obj) => {
      //create a new room and save the details to the database
      const groupId = uuidv4()
      const groupDetails = new Conversation({ groupId, userId: obj.name })
      await groupDetails.save()

      socket.join(groupId)
    })

    socket.on("join-group", async (obj) => {
      //join an existing room
      socket.join(obj.groupId)
      socket.broadcast
        .to(obj.groupId)
        .emit("join-group", `${obj.name} joined`)
    })

    //sending real time group messages
    socket.on("group-message", async (obj) => {
      const groupMessage = new GroupChat({
        sender: obj.sender,
        message: obj.message,
        groupId: obj.groupId,
      })

      await groupMessage.save()
      socket.broadcast.to(obj.groupId).emit("group-message", obj.message)
    })

    //private messages between users
    socket.on("private-message", async (obj) => {
      try {
        const receiver = await getUser(obj.recipient)

        if (obj.message.trim().length === 0) {
          throw Error("Please type sth")
        }

        const chat = new Chat({
          message: obj.message,
          receiver: obj.recipient,
          sender: obj.sender,
        })
        await chat.save()

        socket.to(receiver.socketId).emit("private-message", obj.message)
      } catch (err) {
        fs.writeFileSync("errorlog.txt", `Error: ${err.message} /n`)
      }
    })

    socket.on("disconnect", async () => {
      await removeUser(socket.id)
    })

    socket.on("error", (error) => {
      fs.writeFileSync("errorlog.txt", `Error: ${error.message} /n`)
    })
  })
}
