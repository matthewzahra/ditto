import { useAuth } from "../../context/AuthContext"

import { useState } from "react"
import { Navigate, Link } from "react-router-dom"

import apiRequest from "../../core/apiRequest"

import "./LoginForm.css"


function LoginForm() {

    //fetching current loggedIn status
    const { loggedIn } = useAuth()
    const { setLoggedIn } = useAuth()

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: "", password: ""})

    const [loginError, setLoginError] = useState("")

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

        setLoginError("")
        setLoading(true)

        try {

            // request login from backend
            const response = await apiRequest("/api/user_auth/login/", {
                method: "POST",
                body: formData
            })
            
            // login response data
            const data = await response.json()
            if (response.ok) {
                setLoggedIn(true)
            } else if (response.status === 401) {
                setLoginError("Email password combination not found")
            } else if (response.status === 400) {
                setLoginError(data.email?.[0] ?? "Please check your input.")
            } else {
                setLoginError("Something went wrong. Please try again later")
            }
        } catch (err) {
            setLoginError("Unable to connect to the server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>

            {loginError && <p className="login-error">{loginError}</p>}

            <label>Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
            </label>
            <label>Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange}/>
            </label>
            <button type="submit" disabled={loading}>{loading ? "Logging in" : "Login"}</button>

            <Link to="/forgotpassword">
                Forgot password?
            </Link>

        </form>
    )
}

export default LoginForm