import "./RestaurantGridItem.css"

function RestaurantGridItem({ restaurant }) {

    return (
        <div className="restaurant-grid-item">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.rating}/5</p>
        </div>
    )

}

export default RestaurantGridItem