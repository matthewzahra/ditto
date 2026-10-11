import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"

import RestaurantMapMarker from "@/features/restaurantTracker/components/RestaurantMapMarker/RestaurantMapMarker"

import "leaflet/dist/leaflet.css"
import "./RestaurantMap.css"

function RecenterMap({ selectedRestaurant, filteredRestaurants, isFromGridRef }) {
    const map = useMap()

    useEffect(() => {
        if (selectedRestaurant === null) return

        if (!isFromGridRef.current) {
            isFromGridRef.current = true
            return
        }

        const restaurant = filteredRestaurants.find((restaurant) => restaurant.id === selectedRestaurant)

        if (!restaurant) return
        
        map.setView(
            restaurant.location,
            15,
            { animate: true, duration: 0.7 }
        )
    }, [selectedRestaurant, filteredRestaurants, map, isFromGridRef])

    return null
}


function RestaurantMap({ selectedRestaurant, setSelectedRestaurant, filteredRestaurants }) {
    const isFromGridRef = useRef(true)

    const handleSelectFromMap = (id) => {
        isFromGridRef.current = false
        setSelectedRestaurant(id)
    }
    
    return (
        <div className="restaurant-map">
            <MapContainer center={[51.5131, -0.1122]} zoom={11} scrollWheelZoom={true} className="map">
                <RecenterMap selectedRestaurant={selectedRestaurant} filteredRestaurants={filteredRestaurants} isFromGridRef={isFromGridRef} />
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantMapMarker key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={handleSelectFromMap}/>
                ))}
            </MapContainer>
        </div>

    )


}

export default RestaurantMap