import { useState } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

import apiRequest from "@/core/apiRequest"

import "./RegisterForm.css"

function RegisterForm() {

    //fetching current loggedIn status
    const { loggedIn } = useAuth()

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: "", password: ""})
    const [registered, setRegistered] = useState(false)
    const [registerError, setRegisterError] = useState("")
    const [loading, setLoading] = useState(false)

    // checking current logged-in status
    if (loggedIn) {
        return <Navigate to="/home" />
    }

    if (registered) {
        return <Navigate to="/verify" />
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

        setRegisterError("")
        setLoading(true)

        try{

            // request register from backend
            const response = await apiRequest("/api/user_auth/register/", {
                method: "POST",
                body: formData
            })
            
            // register response data
            const data = await response.json()
            if (response.ok) {
                sessionStorage.setItem("registerEmail", formData.email)
                setRegistered(true)
            } else {
                setRegisterError("Server error, try again later")
            }
        } catch (err) {
            if (err.status === 400) {
                setRegisterError("Email already taken")
            } else {
                setRegisterError("Unable to connect to the server")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="register-form" onSubmit={handleSubmit}>

            {registerError && <p className="register-error">{registerError}</p>}

            <label>Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
            </label>
            <label>Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange}/>
            </label>
            <button type="submit" disabled={loading}>{loading ? "Registering" : "Register"}</button>

        </form>
    )
}

export default RegisterForm