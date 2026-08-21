import { useState } from "react"

import apiRequest from "../../core/apiRequest"

import "./ProfilePictureUpload.css"

function ProfilePictureUpload({ profilePicture, setProfilePicture }) {
    const [uploading, setUploading] = useState(false)
    
    async function handleImageChange(event) {
        const file = event.target.files[0]

        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append("profile_picture", file)

        try {
            setUploading(true)

            const data = await apiRequest(
                "/api/user_auth/update_profile_picture/",
                {
                    method: "POST",
                    body: formData
                }
            )

            setProfilePicture(data.profile_picture)
        } catch (error) {
            console.error("Failed to upload profile picture:", error)
        } finally {
            setUploading(false)
        }
    }


    return (
        <div  className="profile-picture-upload-container">
            <img src={profilePicture} alt="Profile Picture" />
            <label>
                {uploading ? "Uploading..." : "Change picture"}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </label>
        </div>
    )
}

export default ProfilePictureUpload