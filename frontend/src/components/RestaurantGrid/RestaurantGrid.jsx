import RestaurantGridItem from "../RestaurantGridItem/RestaurantGridItem"
import RestaurantGridHeader from "../RestaurantGridHeader/RestaurantGridHeader"

import "./RestaurantGrid.css"

function RestaurantGrid({ selectedRestaurant, setSelectedRestaurant, filters, setFilters, filteredRestaurants }) {

    return (
        <div className="restaurant-grid-container">
            <RestaurantGridHeader filters={filters} setFilters={setFilters} />

            <div className="restaurant-grid">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantGridItem key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={setSelectedRestaurant}/>
                ))}
            </div>
        </div>
    )
    
}

export default RestaurantGrid