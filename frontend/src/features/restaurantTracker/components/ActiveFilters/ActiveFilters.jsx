import "./ActiveFilters.css"

function ActiveFilters({ filters, setFilters }) {
    return (
        <div className="active-filters">
            {filters.minRating !== null && (
                <div className="active-filter">
                    <span>{filters.minRating}+ stars</span>

                    <button
                        onClick={() => setFilters(prev => ({
                            ...prev,
                            minRating: null
                        }))}
                    >
                        ×
                    </button>
                </div>
            )}

            {filters.cuisine !== null && (
                <div className="active-filter">
                    <span>{filters.cuisine}</span>

                    <button
                        onClick={() => setFilters(prev => ({
                            ...prev,
                            cuisine: null
                        }))}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    )
}

export default ActiveFilters