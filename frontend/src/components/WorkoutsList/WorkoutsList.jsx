import apiRequest from "../../core/apiRequest"
import WorkoutListItem from "../WorkoutListItem/WorkoutListItem"

import "./WorkoutsList.css"

function WorkoutsList({ workouts, setWorkouts }) {
    // TODO add confirm delete, as is done for quotes
    async function onDelete(id) {
        const response = await apiRequest("/api/workout_tracker/delete_workout/",{
            method: "DELETE",
            body : {
                id: id
            }
        })

        if (response.ok) {
            setWorkouts(prev => prev.filter(workout => workout.id !== id))
        }
    }

    return (
        <div className="workouts-list">
        {workouts.map((workout) => (
            <WorkoutListItem key={workout.id} workout={workout} onDelete={onDelete} />
        ))}
        </div>
    )
}

export default WorkoutsList