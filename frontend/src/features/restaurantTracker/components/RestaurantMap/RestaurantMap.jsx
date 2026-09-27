import { useEffect } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"

import RestaurantMapMarker from "@/features/restaurantTracker/components/RestaurantMapMarker/RestaurantMapMarker"

import "leaflet/dist/leaflet.css"
import "./RestaurantMap.css"

function RecenterMap({ selectedRestaurant, filteredRestaurants }) {
    const map = useMap()

    useEffect(() => {
        if (selectedRestaurant === null) return

        const restaurant = filteredRestaurants.find((restaurant) => restaurant.id === selectedRestaurant)

        if (!restaurant) return
        
        map.setView(
            restaurant.location,
            15,
            { animate: true, duration: 0.7 }
        )
    }, [selectedRestaurant, filteredRestaurants, map])

    return null
}


function RestaurantMap({ selectedRestaurant, setSelectedRestaurant, filteredRestaurants }) {
    
    return (
        <div className="restaurant-map">
            <MapContainer center={[51.5131, -0.1122]} zoom={11} scrollWheelZoom={true} className="map">
                <RecenterMap selectedRestaurant={selectedRestaurant} filteredRestaurants={filteredRestaurants} />
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantMapMarker key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={setSelectedRestaurant}/>
                ))}
            </MapContainer>
        </div>

    )


}

export default RestaurantMap