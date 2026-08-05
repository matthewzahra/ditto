import "./ActiveFilters.css"

function ActiveFilters({ filters, setFilters }) {
    const filterLabels = {
        fiveStars: "5 stars"
    }

    return (
        <div className="active-filters">
            {Object.entries(filters)
                .filter(([_, value]) => value)
                .map(([key]) => (
                    <div className="active-filter" key={key}>
                        <span>{filterLabels[key]}</span>

                        <button
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                [key]: false
                            }))}
                        >
                            ×
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveFilters