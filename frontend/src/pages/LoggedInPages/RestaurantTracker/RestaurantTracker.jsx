import { useState, useEffect } from "react"

import "./RestaurantTracker.css"

import RestaurantMap from "../../../components/RestaurantMap/RestaurantMap"
import RestaurantGrid from "../../../components/RestaurantGrid/RestaurantGrid"
import ConfirmRestaurantDelete from "../../../components/ConfirmRestaurantDelete/ConfirmRestaurantDelete"
import apiRequest from "../../../core/apiRequest"

function RestaurantTracker() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [restaurantToDelete, setRestaurantToDelete] = useState(null)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
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

    useEffect(() => {
        setFilteredRestaurants(restaurants.filter((restaurant) => {
            if (filters.fiveStars && restaurant.rating !== 5) {
                return false
            }

            return true
        }))
    }, [restaurants, filters])

    // function to handle requesting deletion
    function onRequestDelete(restaurant) {
        setRestaurantToDelete(restaurant)
        setConfirmDeleteOpen(true)
    }

    // function to handle deleting saved restaurant
    async function onDelete(id) {
        const response = await apiRequest(
            "/api/restaurant/delete_restaurant/",
            {
                method: "DELETE",
                body: {
                    restaurant_id: id
                }
            }
        )
        if (response.ok) {
            setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id))
        }
    }

    return (
        <div className="restaurant-tracker-page">
            <h1>Restaurant tracker page</h1>
            <RestaurantMap selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filteredRestaurants={filteredRestaurants}/>
            <RestaurantGrid selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filters={filters} setFilters={setFilters} filteredRestaurants={filteredRestaurants} onRequestDelete={onRequestDelete} />
            {/* request delete popup, only displayed when deletion is requested */}
            <ConfirmRestaurantDelete restaurantToDelete={restaurantToDelete} confirmDeleteOpen={confirmDeleteOpen} setConfirmDeleteOpen={setConfirmDeleteOpen} onConfirm={() => onDelete(restaurantToDelete.id)} />
        </div>
    )
}

export default RestaurantTracker