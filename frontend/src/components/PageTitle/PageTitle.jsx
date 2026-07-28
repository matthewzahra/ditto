import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function PageTitle() {
    const location = useLocation()

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                document.title = "Home | Ditto"
                break

            case "/home":
                document.title = "Home | Ditto"
                break

            case "/login":
                document.title = "Login | Ditto"
                break

            case "/register":
                document.title = "Register | Ditto"
                break

            case "/verify":
                document.title = "Register | Ditto"
                break

            case "/forgotpassword":
                document.title = "Forgot Password | Ditto"
                break

            case "/updatepassword":
                document.title = "Forgot Password | Ditto"
                break

            case "/inbox":
                document.title = "Inbox | Ditto"
                break
            
            case "/profile":
                document.title = "Profile | Ditto"
                break

            default:
                document.title = "Ditto"
        }
    }, [location.pathname])

    return null
}

export default PageTitle