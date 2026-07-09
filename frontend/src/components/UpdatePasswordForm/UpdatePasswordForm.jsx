import "./UpdatePasswordForm.css"

import { useAuth } from "../../context/AuthContext"

import { useState } from "react"

import { Navigate } from "react-router-dom"

import API from "../../core/API"

import getCookie from "../../core/getCookie"


function UpdatePasswordForm() {

    //fetching current loggedIn status
    const { loggedIn } = useAuth()

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: "", code: "", pass1: "", pass2: ""})

    const [changed, setChanged] = useState(false)

    const [requestError, setRequestError] = useState("")

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

        // request register from backend
        const response = await fetch(`${API}/api/user_auth/update_password/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify(formData)
        })
        
        // register response data
        const data = await response.json()
        console.log(data)
        if (data.success) {
            setChanged(true)
        } else if (response.status == 400) {
            setRequestError("Email already taken")
        } else {
            setRequestError("Server unavailable")
        }
    }

    return (
        <form className="update-password-form" onSubmit={handleSubmit}>

            {requestError && <p className="request-error">{requestError}</p>}

            <label>Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
            </label>
            <label>Password change code:
                <input type="text" name="code" value={formData.code} onChange={handleChange}/>
            </label>
            <label>New password:
                <input type="password" name="pass1" value={formData.pass1} onChange={handleChange}/>
            </label>
            <label>Confirm password:
                <input type="password" name="pass2" value={formData.pass2} onChange={handleChange}/>
            </label>
            <button type="submit">Request Password change</button>

        </form>
    )
}

export default UpdatePasswordForm