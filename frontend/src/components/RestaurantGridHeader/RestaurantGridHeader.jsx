import { useState, useRef, useEffect } from "react"

import "./RestaurantGridHeader.css"

import ActiveFilters from "../ActiveFilters/ActiveFilters"

function RestaurantGridHeader({ filters, setFilters }) {
    const [filterOpen, setFilterOpen] = useState(false)
        
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

    return (
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
    )
}

export default RestaurantGridHeader