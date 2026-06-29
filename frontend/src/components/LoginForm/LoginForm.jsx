import {useState} from "react"
import API from "../../core/dev"
import getCookie from "../../core/getCookie"


function LoginForm() {

    //creates a React hook to store the 
    const [formData, setFormData] = useState({username: "", password: ""})

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${API}/login/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify(formData)
        })
        
        const data = await response.json()
    }

    return (
        <form onSubmit={handleSubmit}>

            <label>Email:
                <input type="text" name="username" value={formData.username} onChange={handleChange}/>
            </label>
            <br></br>
            <label>Password:
                <input type="text" name="password" value={formData.password} onChange={handleChange}/>
            </label>
            <br></br>
            <button type="submit">Login</button>

        </form>
    )
}

export default LoginForm