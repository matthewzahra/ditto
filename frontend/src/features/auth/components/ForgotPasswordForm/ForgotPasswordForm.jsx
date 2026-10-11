import { useState } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

import apiRequest from "@/core/apiRequest"

import "./ForgotPasswordForm.css"


function ForgotPasswordForm() {

    //fetching current loggedIn status
    const { loggedIn } = useAuth()

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: ""})
    const [requested, setRequested] = useState(false)
    const [requestError, setRequestError] = useState("")
    const [loading, setLoading] = useState(false)

    // checking current logged-in status
    if (loggedIn) {
        return <Navigate to="/home" />
    }

    if (requested) {
        return <Navigate to="/updatepassword" />
    }

    // function for updating form data
    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        // stops browser from reloading
        e.preventDefault()

        setRequestError("")
        setLoading(true)

        try {

            // request register from backend
            const response = await apiRequest("/api/user_auth/request_password_change/", {
                method: "POST",
                body: formData
            })
            
            // register response data
            const data = await response.json()
            if (response.ok) {
                sessionStorage.setItem("resetEmail", formData.email)
                setRequested(true)
            }
        } catch (err) {
            if (err.status === 400) {
                setRequestError("Invalid email")
            } else if (err.status === 500) {
                setRequestError("Server error. Please try again later")
            } else {
                setRequestError("Unable to connect to the server")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="request-password-change-form" onSubmit={handleSubmit}>

            {requestError && <p className="request-error">{requestError}</p>}

            <label>Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
            </label>
            <button type="submit" disabled={loading}>{loading ? "Requesting..." : "Request password change code"}</button>

        </form>
    )
}

export default ForgotPasswordForm