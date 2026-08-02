import { MapContainer, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import "./RestaurantMap.css"

function RestaurantMap() {

    return (
        <div className="restaurant-map">
            <MapContainer center={[52.5862, -2.1284]} zoom={13} scrollWheelZoom={true} className="map">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </div>

    )


}

export default RestaurantMap