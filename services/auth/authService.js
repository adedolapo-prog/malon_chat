const { User } = require("../../models/Users/userModel")
const { hashPassword, verifyPassword, tokenHandler } = require("../../utils")

const createUserService = async (payload) => {
  const { fullName, email, password } = payload

  const validateDuplicateUser = await User.exists({ email })

  if (validateDuplicateUser) {
    throw Error("User with this email already exists")
  }

  const passwordHash = await hashPassword(password)
  const newUser = new User({ fullName, email, password: passwordHash })
  await newUser.save()

  return { success: true, response: "User succussfully created", data: {} }
}

const loginUserService = async (payload) => {
  const { email, password } = payload

  const user = await User.findOne({ email }).lean()

  if (!user) {
    throw Error("Invalid email or password")
  }

  const passwordCheck = await verifyPassword(password, user.password)
  if (!passwordCheck) {
    throw Error("Invalid email or password")
  }

  user.password = undefined
  const token = await tokenHandler(user.email, user._id)

  if (!token) {
    throw Error("Something went wrong..")
  }

  return {
    success: true,
    response: "Login Successful",
    data: { ...user, token },
  }
}

module.exports = { createUserService, loginUserService }
