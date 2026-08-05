import { useAuth } from "../../context/AuthContext"
import { useUnreadMessages } from "../../context/UnreadMessagesContext"

import NavItem from "../NavItem/NavItem"
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown"

import "./Navbar.css"

function Navbar() {

    const { loggedIn } = useAuth()
    const { unreadInboxCount } = useUnreadMessages()

    // navbar for logged in users
    if (loggedIn) {

        return (
            <nav className="navbar">
                <div className="nav-left">
                    <NavItem to="/home">Home</NavItem>
                    <NavItem to="/quote">Quote</NavItem>
                    <NavItem to="/restaurant-tracker">Restaurant</NavItem>
                </div>
                <div className="nav-right">
                    <ProfileDropdown />
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