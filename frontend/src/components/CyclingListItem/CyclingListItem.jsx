import "./CyclingListItem.css"

import trashCan from "../../assets/trashCan.svg"

function CyclingListItem({ cycle, onDelete }) {
    return (
        <div className="cycling-list-item">

            <div className="cycling-header">
                <h3>{cycle.title}</h3>
                <p>{cycle.date}</p>
            </div>

            <p className="cycling-distance">
                Distance: {cycle.kms}
            </p>

            <p className="cycling-time">
                Time: {cycle.time}
            </p>

            {onDelete && <button className="cycling-list-item-delete-button" onClick={() => onDelete(cycle.id)}><img src={trashCan} alt="Delete" /></button>}

        </div>
    )
}

export default CyclingListItem