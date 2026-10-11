import { useUserProfile } from "@/context/UserProfileContext"

import NavItem from "@/components/NavItem/NavItem"

import defaultUserPicture from "@/assets/defaultUserPicture.svg"

import "./Profile.css"

function Profile() {
    const { userProfilePicture, userEmail } = useUserProfile()

        return (
        <div className="profile-page">
            <h1>Profile page</h1>
            <div className="profile">

                <div className="profile-picture-container">
                    <img className="profile-page-picture" src={userProfilePicture ? userProfilePicture : defaultUserPicture} alt="profile" />

                    <NavItem to="/edit-profile">Edit Profile</NavItem>

                </div>

                <div className="profile-info-container">
                    <h2>{userEmail}</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile