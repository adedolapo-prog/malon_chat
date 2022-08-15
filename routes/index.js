//importing routes
const authRoute = require("./authRoute")
const messageRoute = require("./messagesRoute")
const videoRoute = require("./videoRoute")

const routes = (app) => {
  const base = `/api/v1`

  //using routes
  app.use(`${base}/auth`, authRoute)
  app.use(`${base}/messages`, messageRoute)
  app.use(`${base}/video`, videoRoute)
}

module.exports = routes
