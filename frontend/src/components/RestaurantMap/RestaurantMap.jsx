import { MapContainer, TileLayer } from "react-leaflet"

import RestaurantMapMarker from "../RestaurantMapMarker/RestaurantMapMarker"

import "leaflet/dist/leaflet.css"
import "./RestaurantMap.css"

function RestaurantMap({ restaurants, selectedRestaurant, setSelectedRestaurant, filteredRestaurants }) {
    
    return (
        <div className="restaurant-map">
            <MapContainer center={[51.5131, -0.1122]} zoom={11} scrollWheelZoom={true} className="map">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantMapMarker key={restaurant.id} restaurant={restaurant} selected={selectedRestaurant === restaurant.id} onSelect={setSelectedRestaurant}/>
                ))}
            </MapContainer>
        </div>

    )


}

export default RestaurantMap