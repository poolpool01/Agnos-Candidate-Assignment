const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

let patientData = {}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

socket.on("patient:update", (data) => {
  patientData = data
  io.emit("staff:update", patientData)
})

  socket.on("patient:submit", (data) => {
    patientData = { ...data, status: "Submitted" }
    io.emit("staff:update", patientData)
  })

  socket.emit("staff:update", patientData)

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001")
})
