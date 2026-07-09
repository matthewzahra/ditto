import { useAuth } from "../../context/AuthContext"

import { useState } from "react"
import { Navigate } from "react-router-dom"

import API from "../../core/API"

import "./LoginForm.css"

import "./LoginForm.css"

import getCookie from "../../core/getCookie"


function LoginForm() {

    //fetching current loggedIn status
    const { loggedIn } = useAuth()
    const { setLoggedIn } = useAuth()

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: "", password: ""})

    const [loginError, setLoginError] = useState("")

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

        // request login from backend
        const response = await fetch(`${API}/api/user_auth/login/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify(formData)
        })
        
        // login response data
        const data = await response.json()
        console.log(data)
        if (data.success) {
            setLoggedIn(true)
        } else if (response.status == 401) {
            setLoginError("Email password combination not found")
        } else if (response.status == 400) {
            setLoginError(data.email?.[0] ?? "Please check your input.")
        } else {
            setLoginError("Something went wrong. Please try again later")
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
            <button type="submit">Login</button>

        </form>
    )
}

export default LoginForm