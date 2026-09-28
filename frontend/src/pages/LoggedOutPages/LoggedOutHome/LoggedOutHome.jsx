import dittoLogo from "@/assets/Ditto_Logo.png"

import "./LoggedOutHome.css"

function LoggedOutHome() {
    return (
        <div className="loggedout-home-page">
            <img src={dittoLogo}></img>
            <p><i>Online Swiss Army Knife - tools for problems you didn't know you had.</i></p>
        </div>
    )
}

export default LoggedOutHome