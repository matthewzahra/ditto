import RestaurantGridItem from "../RestaurantGridItem/RestaurantGridItem"

import "./RestaurantGrid.css"

function RestaurantGrid({ restaurants, selectedRestaurant, setSelectedRestaurant }) {

    return (
        <div className="restaurant-grid-container">
            <div className="restaurant-grid">
                {restaurants.map((restaurant) => (
                    <RestaurantGridItem key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={setSelectedRestaurant}/>
                ))}
            </div>
        </div>
    )
    
}

export default RestaurantGrid