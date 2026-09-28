import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import apiRequest from "@/core/apiRequest"

const UserProfileContext = createContext(null)

export function UserProfileProvider({children}) {
    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userProfilePicture, setUserProfilePicture] = useState(null)

    const { loggedIn } = useAuth()

    useEffect(() => {
        if (loggedIn) {
            async function fetchCurrentUserData() {
                try {
                    const response = await apiRequest("/api/user_auth/get_current_user/")

                    const data = await response.json()

                    setUserId(data.data.id)
                    setUserEmail(data.data.email)
                    setUserProfilePicture(data.data.profile_picture)
                } catch (err) {
                    console.error(err)
                }
            }
            fetchCurrentUserData()
        }
    }, [loggedIn])

    return (
        <UserProfileContext.Provider
            value={{
                userId,
                setUserId,
                userEmail,
                setUserEmail,
                userProfilePicture,
                setUserProfilePicture
            }}
        >
            {children}
        </UserProfileContext.Provider>
    )

}

export function useUserProfile() {
    return useContext(UserProfileContext)
}

export default UserProfileProvider