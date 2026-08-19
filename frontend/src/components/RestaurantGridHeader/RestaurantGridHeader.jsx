import { useState, useRef, useEffect } from "react"

import "./RestaurantGridHeader.css"

import ActiveFilters from "../ActiveFilters/ActiveFilters"

function RestaurantGridHeader({ filters, setFilters, setRecordRestaurantOpen, restaurants }) {
    const [filterOpen, setFilterOpen] = useState(false)
        
    const filterRef = useRef(null)

    const cuisines = [...new Set(restaurants.map(restaurant => restaurant.cuisine).filter(Boolean))]

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

    return (
        <div className="restaurant-grid-header">
            <ActiveFilters filters={filters} setFilters={setFilters} />
            <div className="restaurant-grid-header-actions">
                <div className="filter-container" ref={filterRef}>
                    <button className="filter-button" onClick={() => setFilterOpen(prev => !prev)}>Filter</button>
                    {filterOpen && (
                        <div className="filter-dropdown">
                            <div className="filter-section">
                                <span className="filter-section-title">Minimum rating</span>

                                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                                    <button
                                        key={rating}
                                        className={`filter-option ${
                                            filters.minRating === rating ? "selected" : ""
                                        }`}
                                        onClick={() => {
                                            setFilters(prev => ({
                                                ...prev,
                                                minRating: prev.minRating === rating ? null : rating
                                            }))
                                            setFilterOpen(false)
                                        }}
                                    >
                                        {rating}+ stars
                                    </button>
                                ))}
                            </div>

                            <div className="filter-section">
                                <span className="filter-section-title">Cuisine</span>

                                {cuisines.map((cuisine) => (
                                    <button
                                        key={cuisine}
                                        className={`filter-option ${
                                            filters.cuisine === cuisine ? "selected" : ""
                                        }`}
                                        onClick={() => {
                                            setFilters(prev => ({
                                                ...prev,
                                                cuisine: prev.cuisine === cuisine ? null : cuisine
                                            }))
                                            setFilterOpen(false)
                                        }}
                                    >
                                        {cuisine}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="record-restaurant-container">
                    <button className="record-restaurant-button" onClick={() => setRecordRestaurantOpen(true)}>Record Restaurant</button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantGridHeader