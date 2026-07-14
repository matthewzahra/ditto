import { useEffect } from "react"

import API from "../../core/API"

import "./InboxMessages.css"

function InboxMessages() {
    useEffect(() => {
        async function getMessages() {
            const response = await fetch(`${API}/api/inbox/get_messages/`, {
                method: "GET",
                credentials: "include",
            })

            const data = await response.json()
            console.log(data)

        }

        getMessages()
    }, [])

}

export default InboxMessages