const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())

// ✅ สำคัญมาก
app.get("/", (req, res) => {
  res.send("Server is running")
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})


let patientData = {}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  socket.on("patient:update", (data) => {
    patientData = data
    socket.broadcast.emit("staff:update", patientData)
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

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log("Server running on port", PORT)
})
