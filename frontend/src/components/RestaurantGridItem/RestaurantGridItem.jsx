import "./RestaurantGridItem.css"

import trashCan from "../../assets/trashCan.svg"

function RestaurantGridItem({ restaurant, selected, onSelect, onRequestDelete }) {

    return (
        <div className={`restaurant-grid-item ${selected ? "restaurant-grid-item-selected" : ""}`} onClick={() => onSelect(restaurant.id)}>
            <h3 className="restaurant-grid-item-name">{restaurant.name}</h3>
            <p className="restaurant-grid-item-cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-grid-item-info">{restaurant.info}</p>
            <p className="restaurant-grid-item-rating">Rating: {restaurant.rating}/10</p>
            <button className="restaurant-grid-item-delete-button" onClick={() => onRequestDelete(restaurant)}><img src={trashCan} alt="Delete" /></button>
        </div>
    )

}

export default RestaurantGridItem