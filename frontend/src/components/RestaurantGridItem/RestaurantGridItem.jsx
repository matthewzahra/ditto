import "./RestaurantGridItem.css"

function RestaurantGridItem({ restaurant, selected, onSelect }) {

    return (
        <div className={`restaurant-grid-item ${selected ? "selected" : ""}`} onClick={() => onSelect(restaurant.id)}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.rating}/10</p>
        </div>
    )

}

export default RestaurantGridItem