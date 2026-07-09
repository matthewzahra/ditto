import { useAuth } from "../../context/AuthContext"

import { useState } from "react"
import { Navigate } from "react-router-dom"

import API from "../../core/API"
import getCookie from "../../core/getCookie"

import "./LogoutButton.css"


function LogoutButton() {

    // initialising logged-in status
    const { loggedIn } = useAuth()
    const { setLoggedIn } = useAuth()

    const [logoutError, setLogoutError] = useState("")

    // checking current logged-in status
    if (!loggedIn) {
        return <Navigate to="/login" />
    }

    async function logout() {
        const response = await fetch(`${API}/api/user_auth/logout/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        })
        console.log(response)
        if (response.ok) {
            setLoggedIn(false)
        } else {
            setLogoutError("Logout failed")
        }
    }

    return (
        <div className="logout-button">
        {logoutError && <p className="logout-error">{logoutError}</p>}
        <button onClick={logout}>Logout</button>
        </div>
    )
}

export default LogoutButton