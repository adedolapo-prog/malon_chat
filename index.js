require("dotenv").config({ path: __dirname + "/.env" })
const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const helmet = require("helmet")
const { connection } = require("./utils/mongoConnection")
const { socketConnection } = require("./modules/socket/index")
const { PeerServer } = require("peer")

//Middlewares
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })
socketConnection(io)
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connection
connection()

const peerServer = PeerServer({ port: 9000 })

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log("Listening on port %d", PORT))

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Wow everything is working fine!" })
})

app.use("/peer-server", peerServer)

//convert all emails to lower case
const emailValidation = (req, res, next) => {
  let array = Object.keys(req.body)
  if (array.length !== 0) {
    const mod = new Promise((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].includes("Email") || array[i].includes("email")) {
          req.body[`${array[i]}`] = req.body[`${array[i]}`].toLowerCase().trim()
        }
        if (array.length - 1 === i) {
          resolve()
        }
      }
    })

    Promise.all([mod]).then((res) => next())
  } else {
    return next()
  }
}

app.use(emailValidation)

//Routes
routes(app)

// Handle unhandled promise rejections and exceptions
process.on("unhandledRejection", (err) => {
  console.log(err.message)
  process.exit(1)
})

process.on("uncaughtException", (err) => {
  console.log(err.message)
  process.exit(1)
})

app.use((err, res, next) => {
  return res.status(400).json({ success: false, message: "route not found" })
})
