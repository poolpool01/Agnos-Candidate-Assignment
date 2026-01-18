import { io } from "socket.io-client"
import { useEffect, useState } from "react"

let socket

export function useSocket() {
  const [data, setData] = useState({})

  if (!socket) {
    socket = io("http://localhost:3001")

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED:", socket.id)
    })

    socket.on("disconnect", (reason) => {
      console.log("SOCKET DISCONNECTED:", reason)
    })

    socket.on("connect_error", (err) => {
      console.error("SOCKET CONNECT ERROR:", err.message)
    })
  }

  useEffect(() => {
    const handleUpdate = (payload) => {
      console.log("RECEIVE staff:update", payload)
      setData(payload)
    }

    socket.on("staff:update", handleUpdate)

    return () => {
      socket.off("staff:update", handleUpdate)
    }
  }, [])

  return { socket, data }
}
