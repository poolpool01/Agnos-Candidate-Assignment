const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()

//  CORS: รองรับทั้ง local + deploy
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
)

//  Health check (จำเป็นสำหรับ Render / ตรวจว่า server รันอยู่)
app.get("/", (req, res) => {
  res.send("Socket server is running")
})

const server = http.createServer(app)

//  Socket.io config (รองรับ Vercel / Render)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

let patientData = {}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  //  Real-time update ระหว่างพิมพ์
  socket.on("patient:update", (data) => {
    patientData = {
      ...data,
      status: "Typing",
    }

    io.emit("staff:update", patientData)
  })

  //  Submit (ยืนยันข้อมูล)
  socket.on("patient:submit", (data) => {
    patientData = {
      ...data,
      status: "Submitted",
    }

    io.emit("staff:update", patientData)
  })

  //  ส่งข้อมูลล่าสุดให้ client ที่เพิ่งเข้ามา
  socket.emit("staff:update", patientData)

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})

//  รองรับ local + deploy
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
