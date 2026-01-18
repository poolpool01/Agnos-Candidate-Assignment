import { io } from "socket.io-client"
import { useEffect, useState } from "react"

const socket = io("https://agnos-assingment.onrender.com", {
  path: "/socket.io",
  secure: true,
})

export function useSocket() {
  const [data, setData] = useState({})

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })

    socket.on("staff:update", (payload) => {
      setData(payload)
    })

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message)
    })

    return () => {
      socket.off("staff:update")
    }
  }, [])

  return { socket, data }
}
