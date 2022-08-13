const { verifyToken } = require("./index")

const isAuthenticated = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization

    if (authToken) {
      authToken = authToken.split(" ")[1]
      const payload = await verifyToken(authToken)
      if (payload) {
        req.payload = payload
        res.locals.jwt = payload
        return next()
      }
    }

    throw new Error("Not Authorized!")
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      error.message = "Token expired, please sign in again"
    }
    return res.status(401).json({ message: error.message })
  }
}

module.exports = isAuthenticated
