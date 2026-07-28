import "./UpdatePasswordForm.css"

import { useAuth } from "../../context/AuthContext"

import { useState } from "react"

import { Navigate } from "react-router-dom"

import apiRequest from "../../core/apiRequest"


function UpdatePasswordForm() {

    //fetching current loggedIn status
    const { loggedIn } = useAuth()

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: sessionStorage.getItem("resetEmail"), code: "", pass1: "", pass2: ""})

    const [changed, setChanged] = useState(false)

    const [requestError, setRequestError] = useState("")
    
    const [loading, setLoading] = useState(false)

    // checking current logged-in status
    if (loggedIn) {
        return <Navigate to="/home" />
    }

    if (changed) {
        return <Navigate to="/login" />
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
            const response = await apiRequest("/api/user_auth/update_password/", {
                method: "POST",
                body: fordData
            })
            
            // register response data
            const data = await response.json()
            if (response.ok) {
                sessionStorage.removeItem("resetEmail")
                setChanged(true)
            } else if (response.status === 400) {
                setRequestError("Passwords must match")
            } else if (response.status === 401) {
                setRequestError("Code incorrect")
            } else {
                setRequestError("Server unavailable")
            }
        } catch (err) {
            setRequestError("Unable to connect to the server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="update-password-form" onSubmit={handleSubmit}>

            {requestError && <p className="request-error">{requestError}</p>}

            <label>Password change code:
                <input type="text" name="code" value={formData.code} onChange={handleChange}/>
            </label>
            <label>New password:
                <input type="password" name="pass1" value={formData.pass1} onChange={handleChange}/>
            </label>
            <label>Confirm password:
                <input type="password" name="pass2" value={formData.pass2} onChange={handleChange}/>
            </label>
            <button type="submit" disabled={loading}>{loading ? "Updating" : "Update Password"}</button>

        </form>
    )
}

export default UpdatePasswordForm