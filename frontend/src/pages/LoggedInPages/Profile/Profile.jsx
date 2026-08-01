import "./Profile.css"
import userPic from "../../../assets/userPic.svg"

function Profile() {
        return (
        <div className="profile-page">
            <h1>Profile page</h1>
            <h2>Username here</h2>
            <img className="profile-page-picture" src={userPic} alt="profile" />
        </div>
    )
}

export default Profile