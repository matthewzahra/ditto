import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"

import "./LoggedOutLayout.css"

function LoggedOutLayout() {

    const { loggedIn } = useAuth()

    // only display layout if users are logged in, otherwise send to login page
    if (!loggedIn) {
        return (
        <div className="logged-out-layout">
            <Header />

            <div className="logged-out-content">
                <Outlet />
            </div>
            
        </div>
        )
    } else {
        return (
            <Navigate to="/home" />
        )
    }
}

export default LoggedOutLayout