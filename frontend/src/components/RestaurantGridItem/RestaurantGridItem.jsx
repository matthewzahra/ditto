import "./RestaurantGridItem.css"

function RestaurantGridItem({ restaurant, selected, onSelect }) {

    return (
        <div className={`restaurant-grid-item ${selected ? "restaurant-grid-item-selected" : ""}`} onClick={() => onSelect(restaurant.id)}>
            <h3 className="restaurant-grid-item-name">{restaurant.name}</h3>
            <p className="restaurant-grid-item-cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-grid-item-info">{restaurant.info}</p>
            <p className="restaurant-grid-item-rating">Rating: {restaurant.rating}/10</p>
        </div>
    )

}

export default RestaurantGridItem