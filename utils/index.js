const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const hashPassword = async (password) => {
  return await argon2.hash(password)
}

const verifyPassword = async (password, dbpassword) => {
  return await argon2.verify(dbpassword, password)
}

const tokenHandler = async (email, _id, userType = null) => {
  try {
    const token = jwt.sign({ email, _id, userType }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    return token
  } catch (error) {
    throw new Error("Unable to generate token.")
  }
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error("Unable to verify token.")
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  tokenHandler,
  verifyToken,
}
