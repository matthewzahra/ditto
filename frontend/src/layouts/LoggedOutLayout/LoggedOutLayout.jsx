import { Outlet, Navigate } from "react-router-dom"

import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"

import "./LoggedOutLayout.css"

function LoggedOutLayout() {
    // replace below with actual auth ////////////////////////////////////////////
    let userLoggedIn = false

    // only display layout if users are logged in, otherwise send to login page
    if (!userLoggedIn) {
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