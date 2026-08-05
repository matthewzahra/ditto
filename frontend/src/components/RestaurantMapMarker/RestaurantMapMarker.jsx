import { Marker, Popup } from "react-leaflet"

import "./RestaurantMapMarker.css"

function RestaurantMapMarker({ restaurant }) {

    return (
        <Marker position={restaurant.location}>
            <Popup>
                <h3>{restaurant.name}</h3>
                <p>Rating: {restaurant.rating}/5</p>
            </Popup>
        </Marker>
    )

}

export default RestaurantMapMarker