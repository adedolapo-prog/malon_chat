const express = require("express")
const router = express.Router()
const {
  createUserController,
  loginUserController,
} = require("../controllers/auth/authController")

//auth routes
router.post("/signup", createUserController)
router.post("/login", loginUserController)

module.exports = router
