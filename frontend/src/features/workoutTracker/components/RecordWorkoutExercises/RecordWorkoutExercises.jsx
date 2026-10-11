import ExerciseItem from "@/features/workoutTracker/components/ExerciseItem/ExerciseItem"

import "./RecordWorkoutExercises.css"

function RecordWorkoutExercises({ exercises, workoutExercises, setWorkoutExercises, setRecordWorkoutError }) {
    // TODO overhaul below so it doesn't suck
    return (
        <div className="record-workout-exercises">
            <div className="workout-exercises">
                {workoutExercises.map((exercise) => (
                    <ExerciseItem key={exercise.id} exercise={exercise} setWorkoutExercises={setWorkoutExercises} setRecordWorkoutError={setRecordWorkoutError} />
                ))}
            </div>
        </div>
    )
}

export default RecordWorkoutExercises