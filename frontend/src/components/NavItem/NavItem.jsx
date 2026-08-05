import { NavLink } from "react-router-dom"

import "./NavItem.css"

function NavItem({ to, children, className }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${isActive ? "nav-item active" : "nav-item"} ${className}`
            }
        >
            {children}
        </NavLink>
    )
}

export default NavItem