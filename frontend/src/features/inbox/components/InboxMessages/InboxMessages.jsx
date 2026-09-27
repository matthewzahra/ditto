import { useEffect, useState } from "react"

import { useUnreadMessages } from "@/context/UnreadMessagesContext"
import { useWebSocket } from "@/context/WebSocketContext"

import apiRequest from "@/core/apiRequest"

import InboxNotification from "@/features/inbox/components/InboxNotification/InboxNotification"

import "./InboxMessages.css"

function InboxMessages() {
    const [messages, setMessages] = useState([])
    const [filter, setFilter] = useState("all")
    const [sortOrder, setSortOrder] = useState("newest")
    const [readingMessages, setReadingMessages] = useState([])
    const [inboxError, setInboxError] = useState("")
    const [expandedMessage, setExpandedMessage] = useState(null)

    const { decrementUnreadInboxCount } = useUnreadMessages()
    const { newInboxMessage } = useWebSocket()

    const markAsRead = async (id) => {
        setReadingMessages((prev) => [...prev, id])

        try {

            // mark inbox message as read
            const response = await apiRequest("/api/inbox/read_message/", {
                method: "POST",
                body: {message_id: id}
            })

            if (response.ok) {
                const message = messages.find(message => message.id === id)

                if (message && !message.read) {
                    decrementUnreadInboxCount()
                }

                setMessages((prevMessages) =>
                prevMessages.map((message) => 
                message.id === id ? {...message, read: true} : message))
            } else {
                console.error("Failed to mark message as read")
            }
        } catch (err) {
            setInboxError("Unbale to connect to the server")
        }finally {
            setReadingMessages((prev) => prev.filter((messageId) => messageId !== id))
        }
    }

    const deleteRequest = async (id) => {
        setReadingMessages((prev) => [...prev, id])

        try {

            // delete inbox message
            const response = await apiRequest("/api/inbox/delete_message/", {
                method: "POST",
                body: {message_id: id}
            })

            if (response.ok) {
                const message = messages.find(message => message.id === id)

                if (message && !message.read) {
                    decrementUnreadInboxCount()
                }

                setMessages((prevMessages) =>
                prevMessages.filter((message) => message.id !== id))
            } else {
                console.error("Failed to delete message")
            }
        } catch (err) {
            setInboxError("Unbale to connect to the server")
        }finally {
            setReadingMessages((prev) => prev.filter((messageId) => messageId !== id))
        }
    }

    async function getMessages(signal) {
        try {

            // fetch messages from backend
            const response = await apiRequest("/api/inbox/get_messages/", {
            method: "GET", signal
        })

            const data = await response.json()

            setMessages(data.data ?? [])
        } catch (err) {
            if (err.name !== "AbortError") {
                setInboxError("Unbale to connect to the server")
            }
        }

    }

    // get notifications to be displayed
    useEffect(() => {
        const controller = new AbortController()

        getMessages(controller.signal)

        return () => {
            controller.abort()
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        getMessages(controller.signal)

        return () => {
            controller.abort()
        }
    }, [newInboxMessage])


    // filter and sort messages according to current filter and sort selected
    const filteredMessages = messages.filter((message) => {
        switch (filter) {
            case "read":
                return message.read
            case "unread":
                return !message.read
            default:
                return true
        }
    })

    const sortedMessages = [...filteredMessages].sort((a, b) => {
        switch (sortOrder) {
            case "newest":
                return new Date(b.created_at) - new Date(a.created_at)
            case "oldest":
                return new Date(a.created_at) - new Date(b.created_at)
            default:
                return 0
        }
    })


    return (
        <div className="inbox-messages">

            {inboxError && <p className="inbox-error">{inboxError}</p>}

            <div className="controls">
                <div className="filter">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
                </div>
                <div className="sort-order">
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
            <div className="notifications">
                {sortedMessages.map((message) => (
                    <InboxNotification 
                    key={message.id} 
                    title={message.title} 
                    body={message.body} 
                    read={message.read} 
                    onRead={() => markAsRead(message.id)} 
                    disabled={readingMessages.includes(message.id)} 
                    deleteMessage={() => deleteRequest(message.id)} 
                    expanded={expandedMessage === message.id} 
                    onExpand={() => {
                        setExpandedMessage(expandedMessage === message.id ? null : message.id)
                    }} />
                ))}
            </div>
        </div>
    )

}

export default InboxMessages