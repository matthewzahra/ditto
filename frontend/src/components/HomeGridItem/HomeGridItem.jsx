import { NavLink } from "react-router-dom"

import "./HomeGridItem.css"

function HomeGridItem({ name, image, to }) {
    return (
        <NavLink to={to} className="home-grid-item">
            <p>{name}</p>
            <img src={image} alt="" />
        </NavLink>
    )
}

export default HomeGridItem