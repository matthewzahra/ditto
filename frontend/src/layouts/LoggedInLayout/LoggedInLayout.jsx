import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

import Header from "@/components/Header/Header"

import "./LoggedInLayout.css"

function LoggedInLayout() {

    const { loggedIn, loadingIn } = useAuth()

    if (loadingIn) {

    } else {
        // only display layout if users are logged in, otherwise send to login page
        if (loggedIn) {
            return (
            <div className="logged-in-layout">
            
                <Header />

                <div className="logged-in-content">
                    <Outlet />
                </div>
            </div>
            )
        } else {
            return (
                <Navigate to="/login" />
            )
        }
    }
    
}

export default LoggedInLayout