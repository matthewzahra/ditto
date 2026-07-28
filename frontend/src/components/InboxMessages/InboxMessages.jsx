import { useEffect, useState } from "react"

import apiRequest from "../../core/apiRequest"

import InboxNotification from "../InboxNotification/InboxNotification"

import "./InboxMessages.css"

function InboxMessages() {
    const [messages, setMessages] = useState([])
    const [filter, setFilter] = useState("all")
    const [sortOrder, setSortOrder] = useState("newest")
    const [readingMessages, setReadingMessages] = useState([])
    const [inboxError, setInboxError] = useState("")
    const [expandedMessage, setExpandedMessage] = useState(null)

    const markAsRead = async (id) => {
        setReadingMessages((prev) => [...prev, id])

        try {

            // mark inbox message as read
            const response = await apiRequest("/api/inbox/read_message/", {
                method: "POST",
                body: {message_id: id}
            })

            if (response.ok) {
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
    
    // get notifications to be displayed
    useEffect(() => {
        async function getMessages() {
            try {

                // fetch messages from backend
                const response = await apiRequest("/api/inbox/get_messages/", {
                method: "GET"
            })

                const data = await response.json()

                setMessages(data.data ?? [])
            } catch (err) {
                setInboxError("Unbale to connect to the server")
            }

        }

        getMessages()
    }, [])

    console.log(messages)

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

    console.log(filteredMessages)
    console.log(sortedMessages)

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