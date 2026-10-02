import { useState, useEffect } from "react"

import RestaurantMap from "@/features/restaurantTracker/components/RestaurantMap/RestaurantMap"
import RestaurantGrid from "@/features/restaurantTracker/components/RestaurantGrid/RestaurantGrid"
import ConfirmRestaurantDelete from "@/features/restaurantTracker/components/ConfirmRestaurantDelete/ConfirmRestaurantDelete"
import RecordRestaurant from "@/features/restaurantTracker/components/RecordRestaurant/RecordRestaurant"
import apiRequest from "@/core/apiRequest"

import "./RestaurantTracker.css"

function RestaurantTracker() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [recordRestaurantOpen, setRecordRestaurantOpen] = useState(false)
    const [restaurantToDelete, setRestaurantToDelete] = useState(null)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantCuisine, setRestaurantCuisine] = useState("")
    const [restaurantRating, setRestaurantRating] = useState("")
    const [restaurantInfo, setRestaurantInfo] = useState("")
    const [filters, setFilters] = useState({
        search: "",
        minRating: null,
        cuisine: null,
        visited: null,
        favourited: null,
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
            if (filters.search && !restaurant.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false
            }

            if (filters.minRating !== null && restaurant.rating < filters.minRating) {
                return false
            }

            if (filters.cuisine !== null && restaurant.cuisine !== filters.cuisine) {
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

    // function to handle favouriting a restaurant
    async function onFavourite(id) {
        const response = await apiRequest(
            "/api/restaurant/favourite_restaurant/",
            {
                method: "POST",
                body: {
                    restaurant_id: id
                }
            }
        )
        if (response.ok) {
            setRestaurants(prev => prev.map(restaurant => restaurant.id === id ? {...restaurant, favourited: true} : restaurant))
        }
    }

    // function to handle unfavouriting a restaurant
    async function onUnfavourite(id) {
        const response = await apiRequest(
            "/api/restaurant/unfavourite_restaurant/",
            {
                method: "POST",
                body: {
                    restaurant_id: id
                }
            }
        )
        if (response.ok) {
            setRestaurants(prev => prev.map(restaurant => restaurant.id === id ? {...restaurant, favourited: false} : restaurant))
        }
    }

    // function to handle visiting a restaurant
    async function onVisit(id) {
        const response = await apiRequest(
            "/api/restaurant/visit_restaurant/",
            {
                method: "POST",
                body: {
                    restaurant_id: id
                }
            }
        )
        if (response.ok) {
            setRestaurants(prev => prev.map(restaurant => restaurant.id === id ? {...restaurant, visited: true} : restaurant))
        }
    }

    // function to handle unvisiting a restaurant
    async function onUnvisit(id) {
        const response = await apiRequest(
            "/api/restaurant/unvisit_restaurant/",
            {
                method: "POST",
                body: {
                    restaurant_id: id
                }
            }
        )
        if (response.ok) {
            setRestaurants(prev => prev.map(restaurant => restaurant.id === id ? {...restaurant, visited: false} : restaurant))
        }
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
            <RestaurantMap selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filteredRestaurants={filteredRestaurants}/>
            <RestaurantGrid selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filters={filters} setFilters={setFilters} filteredRestaurants={filteredRestaurants} onRequestDelete={onRequestDelete} setRecordRestaurantOpen={setRecordRestaurantOpen} restaurants={restaurants} onFavourite={onFavourite} onUnfavourite={onUnfavourite} onVisit={onVisit} onUnvisit={onUnvisit} />
            {/* request delete popup, only displayed when deletion is requested */}
            <ConfirmRestaurantDelete restaurantToDelete={restaurantToDelete} confirmDeleteOpen={confirmDeleteOpen} setConfirmDeleteOpen={setConfirmDeleteOpen} onConfirm={() => onDelete(restaurantToDelete.id)} />
            <RecordRestaurant recordRestaurantOpen={recordRestaurantOpen} setRecordRestaurantOpen={setRecordRestaurantOpen} restaurantName={restaurantName} setRestaurantName={setRestaurantName} restaurantAddress={restaurantAddress} setRestaurantAddress={setRestaurantAddress} restaurantCuisine={restaurantCuisine} setRestaurantCuisine={setRestaurantCuisine} restaurantRating={restaurantRating} setRestaurantRating={setRestaurantRating} restaurantInfo={restaurantInfo} setRestaurantInfo={setRestaurantInfo} setRestaurants={setRestaurants} />
        </div>
    )
}

export default RestaurantTracker