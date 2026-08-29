import apiRequest from "../../core/apiRequest"
import CyclingListItem from "../CyclingListItem/CyclingListItem"

import "./CyclingList.css"

function CyclingList({ cycles, setCycles }) {
    // TODO add confirm delete, as is done for quotes
    async function onDelete(id) {
        const response = await apiRequest("/api/workout_tracker/delete_cardio/", {
            method: "DELETE",
            body: {
                id: id
            }
        })

        if (response.ok) {
            setCycles(prev => prev.filter(cycle => cycle.id !== id))
        }
    }

    return  (
        <div className="cycling-list">
        {cycles.map((cycle) => (
            <CyclingListItem key={cycle.id} cycle={cycle} onDelete={onDelete} />
        ))}
        </div>
    )
}

export default CyclingList