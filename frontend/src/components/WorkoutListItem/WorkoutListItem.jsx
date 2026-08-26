import "./WorkoutListItem.css"

function WorkoutListItem({ workout }) {
    return (
        <>
        <p>{workout.date}</p>
        <p>{workout.num_rounds}</p>
        </>
    )
}

export default WorkoutListItem