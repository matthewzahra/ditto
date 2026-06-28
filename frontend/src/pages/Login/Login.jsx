import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"
import LoginForm from "../../components/LoginForm/LoginForm"

function Login() {
    return (
        <>
        <Header />
        <Navbar />
        <h1>Login page</h1>
        <LoginForm />
        </>
    )
}

export default Login