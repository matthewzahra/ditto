import dittoLogo from "@/assets/Ditto_Logo.png"

import Navbar from "@/components/Navbar/Navbar"

import "./Header.css"

function Header() {    
    return (

        <header className="header">
            
            <img className="header-logo" src={dittoLogo} alt="Ditto logo" />
            <Navbar />
            
        </header>
        
    )
}

export default Header