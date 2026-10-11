import apiRequest from "@/core/apiRequest"

import "./RecordRestaurant.css"

function RecordRestaurant({
    recordRestaurantOpen,
    setRecordRestaurantOpen,
    restaurantName,
    setRestaurantName,
    restaurantAddress,
    setRestaurantAddress,
    restaurantCuisine,
    setRestaurantCuisine,
    restaurantRating,
    setRestaurantRating,
    restaurantInfo,
    setRestaurantInfo,
    setRestaurants
}) {

    // function to handle when a user submits a restaurant for saving
    async function onRecordRestaurant() {
        if (!restaurantName.trim()) {
            return
        }

        try {
            const requestBody = {
                name: restaurantName.trim(),
                address: restaurantAddress.trim(),
                cuisine: restaurantCuisine.trim(),
                rating: Number(restaurantRating),
                info: restaurantInfo.trim()
            }

            const response = await apiRequest(
                "/api/restaurant/record_restaurant/",
                {
                    method: "POST",
                    body: requestBody
                }
            )

            const data = await response.json()

            if (data.success) {
                const savedRestaurant = {
                    ...data.data,
                    location: [
                        data.data.latitude,
                        data.data.longitude
                    ]
                }

                setRestaurants(prev => [
                    ...prev,
                    savedRestaurant
                ])

                setRestaurantName("")
                setRestaurantAddress("")
                setRestaurantCuisine("")
                setRestaurantRating("")
                setRestaurantInfo("")
                setRecordRestaurantOpen(false)
            }
        } catch (err) {
            console.error("Failed to record restaurant:", err)
        }
    }

    function onDiscard() {
        setRestaurantName("")
        setRestaurantAddress("")
        setRestaurantCuisine("")
        setRestaurantRating("")
        setRestaurantInfo("")
        setRecordRestaurantOpen(false)
    }

    return (
        <>
            {recordRestaurantOpen && (
                <div
                    className="record-restaurant-overlay"
                    onClick={() => setRecordRestaurantOpen(false)}
                >
                    <div
                        className="record-restaurant-form"
                        onClick={event => event.stopPropagation()}
                    >
                        <h2>Record Restaurant</h2>

                        <input
                            type="text"
                            placeholder="Restaurant name..."
                            value={restaurantName}
                            onChange={event => setRestaurantName(event.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Address..."
                            value={restaurantAddress}
                            onChange={event => setRestaurantAddress(event.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Cuisine..."
                            value={restaurantCuisine}
                            onChange={event => setRestaurantCuisine(event.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Rating..."
                            value={restaurantRating}
                            onChange={event => setRestaurantRating(event.target.value)}
                        />

                        <textarea
                            placeholder="Restaurant information..."
                            value={restaurantInfo}
                            onChange={event => setRestaurantInfo(event.target.value)}
                        />

                        <div className="record-restaurant-buttons">
                            <button
                                className="record-restaurant-save-button"
                                onClick={onRecordRestaurant}
                            >
                                Save restaurant
                            </button>

                            <button
                                className="record-restaurant-discard-button"
                                onClick={onDiscard}
                            >
                                Discard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RecordRestaurant