import { useState, useEffect } from "react"

import "./RestaurantTracker.css"

import RestaurantMap from "../../../components/RestaurantMap/RestaurantMap"
import RestaurantGrid from "../../../components/RestaurantGrid/RestaurantGrid"
import apiRequest from "../../../core/apiRequest"

function RestaurantTracker() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [filters, setFilters] = useState({
            fiveStars: false,
        })

    // fetching user restaurants
    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const response = await apiRequest("/api/restaurant/get_user_restaurants/")

                const data = await response.json()

                const formattedRestaurants = data.data.map((restaurant) => ({
                    ...restaurant,
                    location: [
                        restaurant.latitude,
                        restaurant.longitude
                    ]
                }))

                setRestaurants(formattedRestaurants)

            } catch (err) {
                console.error("Failed to fetch restaurants: ", err)
            }
        }

        fetchRestaurants()
    }, [])

    const filteredRestaurants = restaurants.filter((restaurant) => {
        if (filters.fiveStars && restaurant.rating !== 5) {
            return false
        }

        return true
    })

    return (
        <div className="restaurant-tracker-page">
            <h1>Restaurant tracker page</h1>
            <RestaurantMap selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filteredRestaurants={filteredRestaurants}/>
            <RestaurantGrid selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filters={filters} setFilters={setFilters} filteredRestaurants={filteredRestaurants}/>
        </div>
    )
}

export default RestaurantTracker