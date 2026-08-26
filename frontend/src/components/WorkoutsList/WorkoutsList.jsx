import apiRequest from "../../core/apiRequest"
import WorkoutListItem from "../WorkoutListItem/WorkoutListItem"

import "./WorkoutsList.css"

function WorkoutsList({ workouts, setWorkouts }) {
    // TODO add confirm delete, liuke for quotes
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
        <>
        {workouts.map((workout) => (
            <WorkoutListItem key={workout.id} workout={workout} onDelete={onDelete} />
        ))}
        </>
    )
}

export default WorkoutsList