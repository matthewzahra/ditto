import { createContext, useContext, useState, useEffect } from "react"

import API from "../core/API"

// helper functions
import getCSRF from "../core/getCSRF"

import getCookie from "../core/getCookie"

import logoutRequest from "../core/logoutRequest"

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [logoutError, setLogoutError] = useState("")

    // creating csrf token
    useEffect(() => {
        getCSRF()
    }, [])

    useEffect(() => {
        async function checkLogin() {
            const response = await fetch(`${API}/api/user_auth/status/`, {
                method: "GET",
                credentials: "include",
            })

            const data = await response.json()


            setLoggedIn(data.data.loggedIn)
        }

        checkLogin()
    }, [])

    async function logout() {

        const response = await logoutRequest()

        if (response.ok) {
            setLoggedIn(false)
            setLogoutError("")
        } else {
            setLogoutError("Logout failed")
        }
    }
    

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}