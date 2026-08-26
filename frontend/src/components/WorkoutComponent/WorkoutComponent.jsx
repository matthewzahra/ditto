import WorkoutsList from "../WorkoutsList/WorkoutsList"

import "./WorkoutComponent.css"

function WorkoutComponent({ setRecordExerciseOpen, exercises, setExercises, setRecordWorkoutOpen, workouts, setWorkouts }) {
    // TODO check below sorts it correctly
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date))
    
    return (
        <div className="workout-component">
            <div className="workout-component-header">
                <div>
                    <h2>Workouts</h2>
                    <button className="record-exercise-button" onClick={() => setRecordExerciseOpen(true)}>Record Exercise</button>
                    <button className="record-workout-button" onClick={() => setRecordWorkoutOpen(true)}>Record Workout</button>
                    <WorkoutsList workouts={sortedWorkouts} />
                </div>
            </div>
        </div>
    )
}

export default WorkoutComponent