const express = require("express")
const {
  getUserMessagesController,
  getGroupMessagesController
} = require("../controllers/messages/messageController")
const router = express.Router()

//auth routes
router.get("/private/:userId", getUserMessagesController)
router.get("/group-chat/:groupId", getGroupMessagesController)

module.exports = router
