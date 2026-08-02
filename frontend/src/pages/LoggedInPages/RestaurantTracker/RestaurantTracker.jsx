import "./RestaurantTracker.css"

import RestaurantMap from "../../../components/RestaurantMap/RestaurantMap"

function RestaurantTracker() {
    return (
        <div className="restaurant-tracker-page">
            <h1>Restaurant tracker page</h1>
            <RestaurantMap />
        </div>
    )
}

export default RestaurantTracker