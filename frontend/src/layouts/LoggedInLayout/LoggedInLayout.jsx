import { Outlet, Navigate } from "react-router-dom"

import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"

function LoggedInLayout() {

    // replace below with actual auth ////////////////////////////////////////////
    let userLoggedIn = true

    // only display layout if users are logged in, otherwise send to login page
    if (userLoggedIn) {
        return (
        <>
            <Header />
            <Navbar />

            <Outlet />
        </>
        )
    } else {
        return (
            <Navigate to="/login" />
        )
    }
    
}

export default LoggedInLayout