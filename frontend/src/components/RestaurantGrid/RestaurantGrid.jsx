import RestaurantGridItem from "../RestaurantGridItem/RestaurantGridItem"

import "./RestaurantGrid.css"

function RestaurantGrid({ restaurants }) {

    return (
        <div className="restaurant-grid-container">
            <div className="restaurant-grid">
                {restaurants.map((restaurant) => (
                    <RestaurantGridItem key={restaurant.id} restaurant={restaurant}/>
                ))}
            </div>
        </div>
    )
    
}

export default RestaurantGrid