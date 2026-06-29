import {Link} from "react-router-dom"

function Navbar() {

    // replace below with fetching logged in status /////////////////////////////////////
    let userLoggedIn = false
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Home</Link>
            </div>
            <div className="nav-right">
                <Link to="/login">Login</Link>
            </div>

        </nav>
    )
}

export default Navbar