import "./Profile.css"
import userPic from "../../../assets/userPic.svg"

function Profile() {
        return (
        <div className="profile-page">
            <h1>Profile page</h1>
            <div className="profile">
                <img className="profile-page-picture" src={userPic} alt="profile" />
                <div className="profile-info-container">
                    <h2>Username here</h2>
                    <p>Friends: 10</p>
                </div>
            </div>
        </div>
    )
}

export default Profile