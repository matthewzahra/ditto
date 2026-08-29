import apiRequest from "../../core/apiRequest"
import RunningListItem from "../RunningListItem/RunningListItem"

import "./RunningList.css"

function RunningList({ runs, setRuns }) {
    // TODO add confirm delete, as is done for quotes
    async function onDelete(id) {
        const response = await apiRequest("/api/workout_tracker/delete_cardio/", {
            method: "DELETE",
            body: {
                id: id
            }
        })

        if (response.ok) {
            setRuns(prev => prev.filter(run => run.id !== id))
        }
    }

    return  (
        <div className="running-list">
        {runs.map((run) => (
            <RunningListItem key={run.id} run={run} onDelete={onDelete} />
        ))}
        </div>
    )
}

export default RunningList