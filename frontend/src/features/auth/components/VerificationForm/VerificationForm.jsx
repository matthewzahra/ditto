import { useState } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

import apiRequest from "@/core/apiRequest"

import "./VerificationForm.css"


function VerificationForm() {

    //fetching current loggedIn status
    const { loggedIn, setLoggedIn } = useAuth()

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: sessionStorage.getItem("registerEmail"), code: ""})
    const [verificationError, setVerificationError] = useState("")
    const [loading, setLoading] = useState(false)

    // checking current logged-in status
    if (loggedIn) {
        return <Navigate to="/home" />
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

        setVerificationError("")
        setLoading(true)

        try {

            // request verification from backend
            const response = await apiRequest("/api/user_auth/verify_user/", {
                method: "POST",
                body: formData
            })
            
            // verification response data
            const data = await response.json()
            if (response.ok) {
                sessionStorage.removeItem("registerEmail")
                setLoggedIn(true)
            } else {
                setVerificationError("Server error, try again later")
            }
        } catch (err) {
            if (err.status === 401) {
                setVerificationError("Code incorrect")
            }
            setVerificationError("Unable to connect to the server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="verification-form" onSubmit={handleSubmit}>

            {verificationError && <p className="verification-error">{verificationError}</p>}

            <label>Verification code:
                <input type="text" name="code" value={formData.code} onChange={handleChange}/>
            </label>
            <button type="submit" disabled={loading}>{loading ? "Verifying" : "Verify"}</button>

        </form>
    )
}

export default VerificationForm