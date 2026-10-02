import trashCan from "@/assets/trashCan.svg"
import heartEmpty from "@/assets/heartEmpty.svg"
import heartFilled from "@/assets/heartFilled.svg"
import checkBoxEmpty from "@/assets/checkBoxEmpty.svg"
import checkBoxFilled from "@/assets/checkBoxFilled.svg"

import "./RestaurantGridItem.css"

function RestaurantGridItem({ restaurant, selected, onSelect, onRequestDelete, onFavourite, onUnfavourite, onVisit, onUnvisit }) {
    return (
        <div className={`restaurant-grid-item ${restaurant.visited ? "restaurant-grid-item-visited" : ""} ${restaurant.favourited ? "restaurant-grid-item-favourited" : ""} ${selected ? "restaurant-grid-item-selected" : ""}`} onClick={() => onSelect(restaurant.id)}>
            <h3 className="restaurant-grid-item-name">{restaurant.name}</h3>
            <button className="restaurant-grid-item-favourite-button" onClick={restaurant.favourited ? () => onUnfavourite(restaurant.id) : () => onFavourite(restaurant.id)}><img src={restaurant.favourited ? heartFilled : heartEmpty} /></button>
            <p className="restaurant-grid-item-cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-grid-item-info">{restaurant.info}</p>
            <div className="restaurant-grid-item-footer-container">
                <p className="restaurant-grid-item-rating">Rating: {restaurant.rating}/10</p>
                <button className="restaurant-grid-item-visit-button" onClick={restaurant.visited ? () => onUnvisit(restaurant.id) : () => onVisit(restaurant.id)}><span>{restaurant.visited ? "Visited" : "Unvisited"}</span><img src={restaurant.visited ? checkBoxFilled : checkBoxEmpty} /></button>
                <button className="restaurant-grid-item-delete-button" onClick={() => onRequestDelete(restaurant)}><img src={trashCan} alt="Delete" /></button>
            </div>
        </div>
    )

}

export default RestaurantGridItem