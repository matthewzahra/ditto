import WorkoutsList from "../WorkoutsList/WorkoutsList"

import "./WorkoutComponent.css"

function WorkoutComponent({ setRecordExerciseOpen, exercises, setExercises, setRecordWorkoutOpen, workouts, setWorkouts }) {
    // TODO check below sorts it correctly
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date))
    
    return (
        <div className="workout-component">
            <div className="workout-component-header">
                <div>
                    <h2>Workouts</h2>
                    <div className="workout-component-header-actions">
                        <button className="record-exercise-button" onClick={() => setRecordExerciseOpen(true)}>Record Exercise</button>
                        <button className="record-workout-button" onClick={() => setRecordWorkoutOpen(true)}>Record Workout</button>
                    </div>
                    <WorkoutsList workouts={sortedWorkouts} setWorkouts={setWorkouts} />
                </div>
            </div>
        </div>
    )
}

export default WorkoutComponent