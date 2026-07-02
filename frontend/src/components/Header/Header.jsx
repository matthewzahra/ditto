import dittoLogo from "../../assets/logo.png"

import "./Header.css"
import Navbar from "../Navbar/Navbar"

function Header() {
    return (

        <header className="header">
            
            <img className="header-logo" src={dittoLogo} alt="Ditto logo" />
            <Navbar />
            
        </header>
        
    )
}

export default Header