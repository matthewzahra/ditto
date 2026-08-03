import { useRef, useEffect } from "react"

import WebSocketContext from "../context/WebSocketContext"

function WebSocketProvider({ children }) {
    const socketRef = useRef(null)

    useEffect(() => {
        // TODO un-hard code this
        const socket = new WebSocket("ws://localhost:8000/ws/")

        socketRef.current = socket
        socket.onopen = () => {
            console.log("WebSocket connected")
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            console.log("Received:", data)
        }

        socket.onerror = (error) => {
            console.error("WebSocket error:", error)
        }

        socket.onclose = () => {
            console.log("WebSocket disconnected")
        }

        return () => {
            socket.close()
        }
    }, [])

    const sendMessage = (message) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(
                JSON.stringify(message)
            )
        }
    }

    return (
    <WebSocketContext.Provider
        value={{
            sendMessage,
        }}
    >
        {children}
    </WebSocketContext.Provider>
)

}

export default WebSocketProvider