import "./RunningListItem.css"

import trashCan from "../../assets/trashCan.svg"

function RunningListItem({ run, onDelete }) {
    return (
        <div className="running-list-item">

            <div className="running-header">
                <h3>{run.title}</h3>
                <p>{run.date}</p>
            </div>

            <p className="running-distance">
                Distance: {run.kms}
            </p>

            <p className="running-time">
                Time: {run.time}
            </p>

            {onDelete && <button className="running-list-item-delete-button" onClick={() => onDelete(run.id)}><img src={trashCan} alt="Delete" /></button>}

        </div>
    )
}

export default RunningListItem