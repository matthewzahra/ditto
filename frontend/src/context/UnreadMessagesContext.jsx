import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import apiRequest from "@/core/apiRequest"

const UnreadMessagesContext = createContext(null)

export function UnreadMessagesProvider({children}) {
    const [unreadInboxCount, setUnreadInboxCount] = useState(0)
    const [unreadInboxCountError, setUnreadInboxCountError] = useState("")

    const { loggedIn } = useAuth()

    useEffect(() => {
        if (loggedIn) {
            async function fetchUnreadInboxCount() {
                try {
                    const response = await apiRequest("/api/inbox/unread_count/", {
                        method: "GET"
                    })

                    const data = await response.json()


                    setUnreadInboxCount(data.data)
                    setUnreadInboxCountError("")
                } catch (err) {
                    setUnreadInboxCountError("Failed to connect to server")
                }
            }
            fetchUnreadInboxCount()
        } else {
            setUnreadInboxCount(0)
        }
    }, [loggedIn])

    function incrementUnreadInboxCount() {
        setUnreadInboxCount(prev => prev + 1)
    }

    function decrementUnreadInboxCount() {
        setUnreadInboxCount(prev => prev - 1)
    }
    

    return (
        <UnreadMessagesContext.Provider
            value={{
                unreadInboxCount,
                setUnreadInboxCount,
                incrementUnreadInboxCount,
                decrementUnreadInboxCount,
            }}
        >
            {children}
        </UnreadMessagesContext.Provider>
    )
}

export function useUnreadMessages() {
    return useContext(UnreadMessagesContext)
}

export default UnreadMessagesContext