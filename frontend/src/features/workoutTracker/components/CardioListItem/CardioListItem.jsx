import trashCan from "@/assets/trashCan.svg"

import "./CardioListItem.css"

function CardioListItem({ type, cardio, onDelete }) {
    return (
        <div className="cardio-list-item">

            <div className="cardio-header">
                <h3>{cardio.title}</h3>
                <p>{cardio.date}</p>
            </div>

            <p className="cardio-distance">
                Distance: {cardio.kms}
            </p>

            <p className="cardio-time">
                Time: {cardio.time}
            </p>

            {onDelete && <button className="cardio-list-item-delete-button" onClick={() => onDelete(cardio.id)}><img src={trashCan} alt="Delete" /></button>}

        </div>
    )
}

export default CardioListItem