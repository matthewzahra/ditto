import { NavLink } from "react-router-dom"

function NavItem({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
            }
        >
            {children}
        </NavLink>
    )
}

export default NavItem