import "./WorkoutListItem.css"

import trashCan from "@/assets/trashCan.svg"

function WorkoutListItem({ workout, onDelete }) {
    return (
        <div className="workout-list-item">

            <div className="workout-header">
                <h3>{workout.title}</h3>
                <p>{workout.date}</p>
            </div>

            <p className="workout-info">
                {workout.info}
            </p>

            <p className="workout-rounds">
                Rounds: {workout.num_rounds}
            </p>

            <div className="workout-exercises">
                {workout.reps.map((rep) => (
                    <div
                        className="workout-exercise"
                        key={rep.exercise.id}
                    >
                        <p>{rep.exercise.name}</p>
                        <p>{rep.rep_count} reps</p>
                    </div>
                ))}
            </div>

            {onDelete && <button className="workout-list-item-delete-button" onClick={() => onDelete(workout.id)}><img src={trashCan} alt="Delete" /></button>}

        </div>
    )
}

export default WorkoutListItem