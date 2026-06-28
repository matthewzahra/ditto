import {useState} from "react"


function LoginForm() {

    const [formData, setFormData] = useState({email: "", password: ""})

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        
        const data = await response.json()

    }

    return (
        <form onSubmit={handleSubmit}>

            <label>Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
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