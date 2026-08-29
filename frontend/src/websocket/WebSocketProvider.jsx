import { useRef, useEffect, useState } from "react"

import { useUnreadMessages } from "../context/UnreadMessagesContext"

import WebSocketContext from "../context/WebSocketContext"

function WebSocketProvider({ children }) {
    const [newInboxMessage, setNewInboxMessage] = useState(0)

    const socketRef = useRef(null)
    const { incrementUnreadInboxCount } = useUnreadMessages()

    useEffect(() => {
        
        const socket = new WebSocket(import.meta.env.VITE_WEBSOCKETAPI)

        socketRef.current = socket
        socket.onopen = () => {
            console.log("WebSocket connected")
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.type === "NEW_INBOX_MESSAGE") {
                incrementUnreadInboxCount()
                setNewInboxMessage(prev => prev + 1)
            }

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
            newInboxMessage
        }}
    >
        {children}
    </WebSocketContext.Provider>
)

}

export default WebSocketProvider