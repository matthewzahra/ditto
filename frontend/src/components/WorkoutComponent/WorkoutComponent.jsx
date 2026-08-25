import { useEffect, useState } from "react"

import apiRequest from "../../core/apiRequest"

import "./WorkoutComponent.css"

function WorkoutComponent({ setRecordExerciseOpen }) {
    const [exercises, setExercises] = useState([])

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
                </div>
            </div>
        </div>
    )
}

export default WorkoutComponent