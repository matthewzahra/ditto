import { useAuth } from "../../context/AuthContext"

import dittoLogo from "../../assets/logo.png"

import "./Header.css"
import Navbar from "../Navbar/Navbar"

function Header() {

    const { loggedIn } = useAuth()
    
    return (

        <header className="header">
            
            <img className="header-logo" src={dittoLogo} alt="Ditto logo" />
            <Navbar />
            
        </header>
        
    )
}

export default Header