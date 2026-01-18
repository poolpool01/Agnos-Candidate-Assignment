import { io } from "socket.io-client"
import { useEffect, useState } from "react"

let socket

export function useSocket() {
  const [data, setData] = useState({})

  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    })

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED:", socket.id)
    })

    socket.on("connect_error", (err) => {
      console.error("SOCKET ERROR:", err.message)
    })
  }

  useEffect(() => {
    const handleUpdate = (payload) => {
      setData(payload)
    }

    socket.on("staff:update", handleUpdate)

    return () => {
      socket.off("staff:update", handleUpdate)
    }
  }, [])

  return { socket, data }
}
