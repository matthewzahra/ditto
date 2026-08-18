import RestaurantGridItem from "../RestaurantGridItem/RestaurantGridItem"
import RestaurantGridHeader from "../RestaurantGridHeader/RestaurantGridHeader"

import "./RestaurantGrid.css"

function RestaurantGrid({ selectedRestaurant, setSelectedRestaurant, filters, setFilters, filteredRestaurants, onRequestDelete, setRecordRestaurantOpen }) {

    return (
        <div className="restaurant-grid-container">
            <RestaurantGridHeader filters={filters} setFilters={setFilters} setRecordRestaurantOpen={setRecordRestaurantOpen} />

            <div className="restaurant-grid">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantGridItem key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={setSelectedRestaurant} onRequestDelete={onRequestDelete} />
                ))}
            </div>
        </div>
    )
    
}

export default RestaurantGrid