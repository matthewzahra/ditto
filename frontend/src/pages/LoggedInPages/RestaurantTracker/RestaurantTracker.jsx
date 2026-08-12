import { useState } from "react"

import "./RestaurantTracker.css"

import RestaurantMap from "../../../components/RestaurantMap/RestaurantMap"
import RestaurantGrid from "../../../components/RestaurantGrid/RestaurantGrid"

function RestaurantTracker() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [filters, setFilters] = useState({
            fiveStars: false,
        })

    const restaurants = [
        {
            id: 1,
            name: "Westminster Bistro",
            location: [51.4995, -0.1248],
            rating: 5
        },
        {
            id: 2,
            name: "Camden Kitchen",
            location: [51.5416, -0.1420],
            rating: 4
        },
        {
            id: 3,
            name: "Shoreditch Grill",
            location: [51.5256, -0.0754],
            rating: 5
        },
        {
            id: 4,
            name: "Canary Wharf Café",
            location: [51.5054, -0.0235],
            rating: 4
        },
        {
            id: 5,
            name: "Greenwich Table",
            location: [51.4826, -0.0077],
            rating: 5
        },
        {
            id: 6,
            name: "Notting Hill Eatery",
            location: [51.5098, -0.1967],
            rating: 4
        },
        {
            id: 7,
            name: "Chelsea Steakhouse",
            location: [51.4875, -0.1687],
            rating: 5
        },
        {
            id: 8,
            name: "Brixton Bites",
            location: [51.4613, -0.1156],
            rating: 3
        },
        {
            id: 9,
            name: "Clapham Corner",
            location: [51.4627, -0.1387],
            rating: 4
        },
        {
            id: 10,
            name: "Wimbledon Pantry",
            location: [51.4214, -0.2063],
            rating: 5
        },
        {
            id: 11,
            name: "Richmond Riverside",
            location: [51.4613, -0.3037],
            rating: 5
        },
        {
            id: 12,
            name: "Kingston Kitchen",
            location: [51.4123, -0.3007],
            rating: 4
        },
        {
            id: 13,
            name: "Hammersmith House",
            location: [51.4927, -0.2230],
            rating: 4
        },
        {
            id: 14,
            name: "Ealing Express",
            location: [51.5130, -0.3089],
            rating: 3
        },
        {
            id: 15,
            name: "Wembley Spice",
            location: [51.5560, -0.2795],
            rating: 5
        },
        {
            id: 16,
            name: "Hampstead Hearth",
            location: [51.5567, -0.1780],
            rating: 5
        },
        {
            id: 17,
            name: "Islington Social",
            location: [51.5380, -0.1022],
            rating: 4
        },
        {
            id: 18,
            name: "Stratford Kitchen",
            location: [51.5413, 0.0032],
            rating: 4
        },
        {
            id: 19,
            name: "Walthamstow Grill",
            location: [51.5886, -0.0190],
            rating: 3
        },
        {
            id: 20,
            name: "Poon's",
            location: [51.51082425901178, -0.11823100305978697],
            rating: 4
        }
    ]

    const filteredRestaurants = restaurants.filter((restaurant) => {
        if (filters.fiveStars && restaurant.rating !== 5) {
            return false
        }

        return true
    })

    return (
        <div className="restaurant-tracker-page">
            <h1>Restaurant tracker page</h1>
            <RestaurantGrid selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filters={filters} setFilters={setFilters} filteredRestaurants={filteredRestaurants}/>
            <RestaurantMap selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} filteredRestaurants={filteredRestaurants}/>
        </div>
    )
}

export default RestaurantTracker