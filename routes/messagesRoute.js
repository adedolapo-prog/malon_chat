const express = require("express")
const {
  getUserMessagesController,
  getGroupMessagesController
} = require("../controllers/messages/messageController")
const router = express.Router()

//auth routes
router.get("/:userId", getUserMessagesController)
router.get("/:groupId", getGroupMessagesController)

module.exports = router
