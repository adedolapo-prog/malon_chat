const express = require("express")
const {
  startVideoController,
  endVideoController,
  getStreamTokenController,
} = require("../modules/twilio")
const router = express.Router()

//auth routes
router.post("/start", startVideoController)
router.post("/end", endVideoController)
router.post("/stream-token", getStreamTokenController)
router.get("/audience-token", getAudienceTokenController)

module.exports = router
