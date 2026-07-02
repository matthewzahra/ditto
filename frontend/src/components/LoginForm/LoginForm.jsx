import {useState} from "react"

import API from "../../core/API"

import "./LoginForm.css"

import "./LoginForm.css"

import getCookie from "../../core/getCookie"


function LoginForm() {

    // initialising object for storing form data
    const [formData, setFormData] = useState({email: "", password: ""})

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
        const response = await fetch(`${API}/login/`, {
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
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>

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