import { useEffect, useRef } from "react"
import { Marker, Popup } from "react-leaflet"
import L from "leaflet"

import locationMarkerBlue from "../../assets/locationMarkerBlue.svg"
import locationMarkerRed from "../../assets/locationMarkerRed.svg"

import "./RestaurantMapMarker.css"

const normalMarker = new L.icon({
    iconUrl: locationMarkerBlue,
    iconSize: [32, 45],
    iconAnchor: [16, 35],
    popupAnchor: [0, -25]
})

const selectedMarker = new L.icon({
    iconUrl: locationMarkerRed,
    iconSize: [32, 45],
    iconAnchor: [16, 35],
    popupAnchor: [0, -25]
})

function RestaurantMapMarker({ restaurant, selected, onSelect }) {

    const markerRef = useRef(null)

    useEffect(() => {
        if (selected) {
            markerRef.current?.openPopup()
        }
    }, [selected])

    return (
        <Marker position={restaurant.location} icon={selected ? selectedMarker : normalMarker} eventHandlers={{click: () => onSelect(restaurant.id)}} ref={markerRef}>
            <Popup autoPan={false}>
                <h3>{restaurant.name}</h3>
                <p>Rating: {restaurant.rating}/5</p>
            </Popup>
        </Marker>
    )

}

export default RestaurantMapMarker