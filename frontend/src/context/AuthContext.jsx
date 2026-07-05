import { createContext, useContext, useState, useEffect } from "react"

import API from "../core/API"

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(false)

    // check below, loading needed??? =============================================== also uncomment ================================================================

    
    useEffect(() => {
        async function checkLogin() {
            const response = await fetch(`${API}/api/user_auth/status/`, {
                credentials: "include"
            })

            const data = await response.json()

            setLoggedIn(data.loggedIn)
        }

        checkLogin()
    }, [])
    

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}