if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("New Connection", socket.id)

  socket.emit("SOCKETUS", {message: `Your ID is : ${socket.id}`})

  io.emit("SOCKETUS", {message: `New user with id ${socket.id}`})

  socket.on("disconnect", () => {
    console.log(`Socket with id ${socket.id} disconnected`)
  })

  socket.on("JoinRoom", (room) => {
    socket.join(room)
    const users = []
    const scores = []
    socket.emit("fetchData", (users, data))
  })
});

const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(require("./routes/router.js"))

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})