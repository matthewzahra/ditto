import { useEffect, useState } from "react"

import apiRequest from "../../core/apiRequest"

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
                </div>
            </div>
        </div>
    )
}

export default WorkoutComponent