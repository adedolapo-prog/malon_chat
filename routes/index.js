//importing routes
const authRoute = require("./authRoute")
const messageRoute = require("./messagesRoute")

const routes = (app) => {
  const base = `/api/v1`

  //using routes
  app.use(`${base}/auth`, authRoute)
  app.use(`${base}/messages`, messageRoute)
}

module.exports = routes
