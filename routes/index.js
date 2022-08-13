//importing routes
const authRoute = require("./authRoute")

const routes = (app) => {
  const base = `/api/v1`

  //using routes
  app.use(`${base}/auth`, authRoute)
}

module.exports = routes
