import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import apiRequest from "../core/apiRequest"

const UserProfileContext = createContext(null)

export function UserProfileProvider({children}) {

    const { loggedIn } = useAuth()

    useEffect(() => {
        if (loggedIn) {
            async function fetchCurrentUserData() {
                try {
                    const response = await apiRequest("/api/user_auth/get_current_user/")

                    const data = await response.json()
                    console.log(data)
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