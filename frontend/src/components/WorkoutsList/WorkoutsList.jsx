import WorkoutListItem from "../WorkoutListItem/WorkoutListItem"

import "./WorkoutsList.css"

function WorkoutsList({ workouts }) {
    return (
        <>
        {workouts.map((workout) => (
            <WorkoutListItem key={workout.id} workout={workout} />
        ))}
        </>
    )
}

export default WorkoutsList