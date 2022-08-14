const express = require("express")
const {
  getUserMessagesController,
  getGroupMessagesController,
  tipUserController,
} = require("../controllers/messages/messageController")
const router = express.Router()

//auth routes
router.get("/private/:userId", getUserMessagesController)
router.get("/group-chat/:groupId", getGroupMessagesController)
router.post("/video-chat/tip/:userId", tipUserController)

module.exports = router
