import NavItem from "../NavItem/NavItem"

import "./Navbar.css"

function Navbar() {

    // replace below with actual auth /////////////////////////////////////
    let userLoggedIn = false

    // navbar for logged in users
    if (userLoggedIn) {

        return (
            <nav className="navbar">
                <div className="nav-left">
                    <NavItem to="/home">Home</NavItem>
                </div>
                <div className="nav-right">
                    <NavItem to="/logout">Logout</NavItem>
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