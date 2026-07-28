import { useState, useRef, useEffect } from "react"

import { useAuth } from "../../context/AuthContext"

import NavItem from "../NavItem/NavItem"

import "./Navbar.css"

import userPic from "../../assets/userPic.svg"
import userIcon from "../../assets/userIcon.svg"
import logoutIcon from "../../assets/logoutIcon.svg"
import inboxIcon from "../../assets/inboxIcon.svg"

function Navbar() {

    const { loggedIn, logout } = useAuth()
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    const profileMenuRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {

            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // navbar for logged in users
    if (loggedIn) {

        return (
            <nav className="navbar">
                <div className="nav-left">
                    <NavItem to="/home">Home</NavItem>
                </div>
                <div className="nav-right">
                    <div className="profile-menu" ref={profileMenuRef}>
                        <button className="profile-picture" onClick={() => setProfileMenuOpen(!profileMenuOpen)}> <img src={userPic} alt="Profile" /> </button>
                        {profileMenuOpen && (
                            <div className="profile-dropdown">

                                <NavItem to="/profile"><img src={userIcon} alt="" />Profile</NavItem>
                                <NavItem to="/inbox"><img src={inboxIcon} alt="" />Inbox</NavItem>

                                <hr className="profile-dropdown-separator" />

                                <button className="nav-item" onClick={logout}><img src={logoutIcon} alt="" />Logout</button>
                            </div>
                        )}
                    </div>
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