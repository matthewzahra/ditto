import { useAuth } from "../../context/AuthContext"

import NavItem from "../NavItem/NavItem"

import "./Navbar.css"

function Navbar() {

    const { loggedIn } = useAuth()
    const { logout } = useAuth()

    // navbar for logged in users
    if (loggedIn) {

        return (
            <nav className="navbar">
                <div className="nav-left">
                    <NavItem to="/home">Home</NavItem>
                </div>
                <div className="nav-right">
                    <NavItem to="/inbox">Inbox</NavItem>
                    <button className="nav-item" onClick={logout}>Logout</button>
                </div>
            </nav>
        )

    // navbar for non-logged in users
    } else {

        return (
            <nav className="navbar">
                <div className="nav-left">
                    <NavItem to="/">Home</NavItem>
                </div>
                <div className="nav-right">
                    <NavItem to="/login">Login</NavItem>
                    <NavItem to="/register">Register</NavItem>
                </div>
            </nav>
        )

    }
}

export default Navbar