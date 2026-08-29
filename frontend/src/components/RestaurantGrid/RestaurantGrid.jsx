import RestaurantGridItem from "../RestaurantGridItem/RestaurantGridItem"
import RestaurantGridHeader from "../RestaurantGridHeader/RestaurantGridHeader"

import "./RestaurantGrid.css"

function RestaurantGrid({ selectedRestaurant, setSelectedRestaurant, filters, setFilters, filteredRestaurants, onRequestDelete, setRecordRestaurantOpen, restaurants }) {

    return (
        <div className="restaurant-grid-container">
            <RestaurantGridHeader filters={filters} setFilters={setFilters} setRecordRestaurantOpen={setRecordRestaurantOpen} restaurants={restaurants} />

            <div className="restaurant-grid">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantGridItem key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={setSelectedRestaurant} onRequestDelete={onRequestDelete} />
                ))}
            </div>
        </div>
    )
    
}

export default RestaurantGrid