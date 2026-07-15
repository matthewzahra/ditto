import { useEffect, useState } from "react"

import API from "../../core/API"

import InboxNotification from "../InboxNotification/InboxNotification"

import "./InboxMessages.css"

function InboxMessages() {
    const [messages, setMessages] = useState([])
    const [filter, setFilter] = useState("all")
    const [sort, setSort] = useState("newest")

    useEffect(() => {
        async function getMessages() {
            const response = await fetch(`${API}/api/inbox/get_messages/`, {
                method: "GET",
                credentials: "include",
            })

            const data = await response.json()
            console.log(data)

            setMessages(data.data ?? [])

        }

        getMessages()
    }, [])

    console.log(messages)

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
        switch (sort) {
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
            <div className="controls">
                <div className="filter">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
                </div>
                <div className="sort">
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
            <div className="notifications">
                {sortedMessages.map((message) => (
                    <InboxNotification key={message.id} title={message.title} body={message.body} />
                ))}
            </div>
        </div>
    )

}

export default InboxMessages