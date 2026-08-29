import { useUserProfile } from "../../../context/UserProfileContext"

import apiRequest from "../../../core/apiRequest"

import "./EditProfile.css"

import ProfilePictureUpload from "../../../components/ProfilePictureUpload/ProfilePictureUpload"

import defaultUserPicture from "../../../assets/defaultUserPicture.svg"

function EditProfile() {

    const { userProfilePicture, setUserProfilePicture } = useUserProfile()

    async function onDeleteProfilePicture() {

        const response = await apiRequest(
            "/api/user_auth/delete_profile_picture/",
            {
                method: "DELETE"
            }
        )

        if (response.ok) {
            setUserProfilePicture(null)
        }
    }

    return (
        <div className="edit-profile-page">
            <h1>Edit profile</h1>

            <div className="edit-profile-picture-container">

                <div className="profile-picture-header">
                    <h3>Profile Picture</h3>
                    <p>Update your profile picture</p>
                </div>

                <ProfilePictureUpload
                    profilePicture={userProfilePicture || defaultUserPicture}
                    setProfilePicture={setUserProfilePicture}
                />

                {userProfilePicture && (
                    <button
                        className="delete-profile-picture-button"
                        onClick={onDeleteProfilePicture}
                    >
                        Delete profile picture
                    </button>
                )}

            </div>
        </div>
    )
}

export default EditProfile