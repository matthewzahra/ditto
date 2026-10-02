import { useState, useRef, useEffect, useMemo } from "react"

import ActiveFilters from "@/features/restaurantTracker/components/ActiveFilters/ActiveFilters"

import "./RestaurantGridHeader.css"

function RestaurantGridHeader({ filters, setFilters, setRecordRestaurantOpen, restaurants }) {
    const [filterOpen, setFilterOpen] = useState(false)
        
    const filterButtonRef = useRef(null)
    const filterMenuRef = useRef(null)

    const cuisines = useMemo (() => 
        [...new Set(restaurants.map(restaurant => restaurant.cuisine).filter(Boolean))], 
    [restaurants])

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterButtonRef.current?.contains(event.target)) {
                return
            }

            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
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
            <div className="restaurant-grid-header-actions">
                {/* search bar */}
                <div className="restaurant-search-container">
                   <input
                        type="text"
                        className="restaurant-search-input"
                        placeholder="Search restaurants..."
                        value={filters.search}
                        onChange={(event) => {
                            setFilters(prev => ({
                                ...prev,
                                search: event.target.value
                            }))
                        }}
                    />
                </div>
                <div className="filter-container" ref={filterButtonRef}>
                    <button className="filter-button" onClick={() => setFilterOpen(prev => !prev)}>Filter</button>
                </div>
                <ActiveFilters filters={filters} setFilters={setFilters} />
                <div className="record-restaurant-container">
                    <button className="record-restaurant-button" onClick={() => setRecordRestaurantOpen(true)}>Record Restaurant</button>
                </div>
                
            </div>
            <div className={`filter-menu ${filterOpen ? "open" : ""}`} ref={filterMenuRef}>
                <div className="filter-section">
                    <span className="filter-section-title">Minimum rating</span>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        className="filter-rating-input"
                        value={filters.minRating || ""}
                        placeholder="e.g. 7"
                        onChange={(event) => {
                            const value = event.target.value
                            setFilters(prev => ({
                                ...prev,
                                minRating: value === "" ? null : Number(value)
                            }))
                        }}
                    />
                </div>

                <div className="filter-section">
                    <span className="filter-section-title">Cuisine</span>
                        <select
                            className="filter-select"
                            value={filters.cuisine || ""}
                            onChange={(event) => {
                                const value = event.target.value
                                setFilters(prev => ({
                                    ...prev,
                                    cuisine: value === "" ? null : value
                                }))
                            }}
                        >
                            <option value="">All cuisines</option>
                            {cuisines.map((cuisine) => (
                                <option key={cuisine} value={cuisine}>
                                    {cuisine}
                                </option>
                            ))}
                        </select>
                </div>
                <div className="filter-section">
                    <span className="filter-section-title">Favourite</span>
                    <select
                        className="filter-select"
                        value={filters.favourited === true ? "true" : filters.favourited === false ? "false" : ""}
                        onChange={(event) => {
                            const value = event.target.value
                            setFilters(prev => ({
                                ...prev,
                                favourited: value === "" ? null : value === "true"
                            }))
                        }}
                    >
                        <option value="">All</option>
                        <option value="true">Favourited</option>
                        <option value="false">Not favourited</option>
                    </select>
                </div>

                <div className="filter-section">
                    <span className="filter-section-title">Visited</span>
                    <select
                        className="filter-select"
                        value={filters.visited === true ? "true" : filters.visited === false ? "false" : ""}
                        onChange={(event) => {
                            const value = event.target.value
                            setFilters(prev => ({
                                ...prev,
                                visited: value === "" ? null : value === "true"
                            }))
                        }}
                    >
                        <option value="">All</option>
                        <option value="true">Visited</option>
                        <option value="false">Not visited</option>
                    </select>
                </div>
                
            </div>
        </div>
    )
}

export default RestaurantGridHeader