import RestaurantGridItem from "@/features/restaurantTracker/components/RestaurantGridItem/RestaurantGridItem"
import RestaurantGridHeader from "@/features/restaurantTracker/components/RestaurantGridHeader/RestaurantGridHeader"

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