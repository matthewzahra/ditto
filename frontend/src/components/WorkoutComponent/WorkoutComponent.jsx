import { useEffect, useState } from "react"

import apiRequest from "../../core/apiRequest"

import "./WorkoutComponent.css"

function WorkoutComponent({ setRecordExerciseOpen, exercises, setExercises, setRecordWorkoutOpen }) {
    // fetching stored exercises
    useEffect(() => {
        async function fetchExercises() {
            const exercisesResponse = await apiRequest("/api/workout_tracker/get_exercises/")
            const exercisesData = await exercisesResponse.json()

            setExercises(exercisesData.data)
        }

        fetchExercises()
    }, [])


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