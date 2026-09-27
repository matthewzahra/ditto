import WorkoutsList from "@/features/workoutTracker/components/WorkoutsList/WorkoutsList"

import "./WorkoutComponent.css"

// TODO consider turning workout list into a grid
function WorkoutComponent({ setRecordExerciseOpen, exercises, setExercises, setRecordWorkoutOpen, workouts, setWorkouts }) {
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
                    
                </div>
            </div>
            <WorkoutsList workouts={sortedWorkouts} setWorkouts={setWorkouts} />
        </div>
    )
}

export default WorkoutComponent