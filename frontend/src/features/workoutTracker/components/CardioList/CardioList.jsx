import apiRequest from "@/core/apiRequest"
import CardioListItem from "@/features/workoutTracker/components/CardioListItem/CardioListItem"

import "./CardioList.css"

function CardioList({ type, cardios, setCardios }) {
    // TODO add confirm delete, as is done for quotes
    async function onDelete(id) {
        const response = await apiRequest("/api/workout_tracker/delete_cardio/", {
            method: "DELETE",
            body: {
                id: id
            }
        })

        if (response.ok) {
            setCardios(prev => ({
                ...prev,
                [type]: prev[type].filter(cardio => cardio.id !== id)
            }))
        }
    }

    return  (
        <div className="cardio-list">
        {cardios.map((cardio) => (
            <CardioListItem key={cardio.id} cardio={cardio} onDelete={onDelete} />
        ))}
        </div>
    )
}

export default CardioList