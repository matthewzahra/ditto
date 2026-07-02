import { useState } from "react"

import API from "../../core/API"

import "./RegisterForm.css"

import getCookie from "../../core/getCookie"


function LoginForm() {

    // initialising object for storing form data
    const [formData, setFormData] = useState({username: "", password: "", email: ""})

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
        const response = await fetch(`${API}/register/`, {
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
    }

    return (
        <form className="register-form" onSubmit={handleSubmit}>

            <label>Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange}/>
            </label>
            <br></br>
            <label>Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
            </label>
            <br></br>
            <label>Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange}/>
            </label>
            <br></br>
            <button type="submit">Register</button>

        </form>
    )
}

export default LoginForm