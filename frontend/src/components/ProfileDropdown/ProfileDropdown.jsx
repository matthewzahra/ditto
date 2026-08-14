import "./ProfileDropdown.css"

import { useState, useRef, useEffect } from "react"

import { useAuth } from "../../context/AuthContext"
import { useUnreadMessages } from "../../context/UnreadMessagesContext"

import NavItem from "../NavItem/NavItem"

import userPic from "../../assets/userPic.svg"
import userIcon from "../../assets/userIcon.svg"
import logoutIcon from "../../assets/logoutIcon.svg"
import inboxIcon from "../../assets/inboxIcon.svg"

function ProfileDropdown() {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    const { logout } = useAuth()
    const { unreadInboxCount } = useUnreadMessages()

    const profileMenuRef = useRef(null)

    useEffect(() => {
        if (!profileMenuOpen) {
            return
        }
        
        function handleClickOutside(event) {

            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [profileMenuOpen])

    return (
        <div className="profile-menu" ref={profileMenuRef}>
            <button className={`profile-picture ${unreadInboxCount > 0 ? "has-notification" : ""}`} onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                <span className="profile-picture-image">
                    <img src={userPic} alt="Profile" />
                </span>

                {unreadInboxCount > 0 && (
                    <span className="profile-inbox-notification-badge">
                        {unreadInboxCount}
                    </span>
                )}

            </button>
            {profileMenuOpen && (
                <div className="profile-dropdown">

                    <NavItem to="/profile"><img src={userIcon} alt="" />Profile</NavItem>
                    <NavItem to="/inbox" className={unreadInboxCount > 0 ? "has-unread" : ""}>
                    
                    <img src={inboxIcon} alt="" />
                    Inbox

                    {unreadInboxCount > 0 && (
                        <span className="inbox-notification-badge"> 
                            {unreadInboxCount}
                        </span>
                    )}

                    </NavItem>

                    <hr className="profile-dropdown-separator" />

                    <button className="nav-item" onClick={logout}><img src={logoutIcon} alt="" />Logout</button>
                </div>
            )}
        </div>
    )

}

export default ProfileDropdown