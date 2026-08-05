import { useState, useEffect, useRef } from "react"

import RestaurantGridItem from "../RestaurantGridItem/RestaurantGridItem"
import ActiveFilters from "../ActiveFilters/ActiveFilters"

import "./RestaurantGrid.css"

function RestaurantGrid({ restaurants, selectedRestaurant, setSelectedRestaurant }) {
    const [filterOpen, setFilterOpen] = useState(false)
    const [filters, setFilters] = useState({
        fiveStars: false,
    })
    const filterRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const filteredRestaurants = restaurants.filter((restaurant) => {
        if (filters.fiveStars && restaurant.rating !== 5) {
            return false
        }

        return true
    })

    return (
        <div className="restaurant-grid-container">
            <div className="restaurant-grid-header">
                <ActiveFilters filters={filters} setFilters={setFilters} />
                <div className="filter-container" ref={filterRef}>
                    <button className="filter-button" onClick={() => setFilterOpen(prev => !prev)}>Filter</button>
                    {filterOpen && (
                        <div className="filter-dropdown">
                            <p>Filter options here</p>
                            <button className={`filter-option ${filters.fiveStars ? "selected" : ""}`} onClick={() => setFilters(prev => ({...prev, fiveStars: !prev.fiveStars}))}>5 stars</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="restaurant-grid">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantGridItem key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={setSelectedRestaurant}/>
                ))}
            </div>
        </div>
    )
    
}

export default RestaurantGrid