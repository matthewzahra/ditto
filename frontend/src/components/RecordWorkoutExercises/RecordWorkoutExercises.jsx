import ExerciseItem from "../ExerciseItem/ExerciseItem"

import "./RecordWorkoutExercises.css"

function RecordWorkoutExercises({ exercises, workoutExercises, setWorkoutExercises }) {
    return (
        <div className="record-workout-exercises">
            <div className="workout-exercises">
                {workoutExercises.map((exercise) => (
                    <ExerciseItem key={exercise.id} exercise={exercise} setWorkoutExercises={setWorkoutExercises} />
                ))}
            </div>
        </div>
    )
}

export default RecordWorkoutExercises