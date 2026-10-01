import trashCan from "@/assets/trashCan.svg"
import heartEmpty from "@/assets/heartEmpty.svg"
import heartFilled from "@/assets/heartFilled.svg"

import "./RestaurantGridItem.css"

function RestaurantGridItem({ restaurant, selected, onSelect, onRequestDelete, onFavourite, onUnfavourite }) {
    return (
        <div className={`restaurant-grid-item ${restaurant.visited ? "restaurant-grid-item-visited" : ""} ${restaurant.favourited ? "restaurant-grid-item-favourited" : ""} ${selected ? "restaurant-grid-item-selected" : ""}`} onClick={() => onSelect(restaurant.id)}>
            <h3 className="restaurant-grid-item-name">{restaurant.name}</h3>
            <button className="restaurant-grid-item-favourite-button" onClick={restaurant.favourited ? () => onUnfavourite(restaurant.id) : () => onFavourite(restaurant.id)}><img src={restaurant.favourited ? heartFilled : heartEmpty} /></button>
            <p className="restaurant-grid-item-cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-grid-item-info">{restaurant.info}</p>
            <p className="restaurant-grid-item-rating">Rating: {restaurant.rating}/10</p>
            <button className="restaurant-grid-item-delete-button" onClick={() => onRequestDelete(restaurant)}><img src={trashCan} alt="Delete" /></button>
        </div>
    )

}

export default RestaurantGridItem