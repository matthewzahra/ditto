import { useUserProfile } from "../../../context/UserProfileContext"

import "./EditProfile.css"

import ProfilePictureUpload from "../../../components/ProfilePictureUpload/ProfilePictureUpload"

function EditProfile() {

    const { userProfilePicture, setUserProfilePicture } = useUserProfile()
    
    return (
        <div className="edit-profile-page">
            <h1>Edit profile page</h1>
            <ProfilePictureUpload profilePicture={userProfilePicture} setProfilePicture={setUserProfilePicture}/>
        </div>
    )
}

export default EditProfile