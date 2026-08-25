import { useState, useEffect } from "react"

import apiRequest from "../../core/apiRequest"
import RecordWorkoutExercises from "../RecordWorkoutExercises/RecordWorkoutExercises"

import "./RecordWorkout.css"

function RecordWorkout({ recordWorkoutOpen, setRecordWorkoutOpen, setWorkouts, exercises }) {
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split("T")[0])
    const [numRounds, setNumRounds] = useState(1)
    const [workoutExercises, setWorkoutExercises] = useState([])

    // effect to initialise workout exercises
    useEffect(() => {
        for (let exercise of exercises) {
            setWorkoutExercises([exercises.map(exercise => [exercise, 0])])
        }
    }, [exercises])

    async function onRecordWorkout() {
        const name = WorkoutName.trim()
        if (!name) {
            return
        }

        try {
            const response = await apiRequest(
                "/api/restaurant/add_Workout",
                {
                    method: "POST",
                    body: { name }
                }
            )

            const data = await response.json()

            if (data.success) {
                setWorkouts(prev => [
                    ...prev,
                    { name }
                ])

                setWorkoutName("")
                setRecordWorkoutOpen(fales)
            }
        } catch (err) {
            console.error("Failed to record Workout: ", err)
        }
    }

    function onDiscard() {
        setWorkoutName("")
        setRecordWorkoutOpen(false)
    }

    return (
        <>
        {recordWorkoutOpen && (
            <div className="record-workout-overlay" onClick={() => setRecordWorkoutOpen(false)}>
                <div className="record-workout-form" onClick={event => event.stopPropagation()}>
                    <h2>Record Workout</h2>
                    <input 
                        type="date"
                        value={workoutDate}
                        onChange={event => setWorkoutDate(event.target.value)}
                    />
                    <input 
                        type="number"
                        value={numRounds}
                        onChange={event => setNumRounds(event.target.value)}
                        min={1}
                    />
                    <RecordWorkoutExercises exercises={exercises} workoutExercises={workoutExercises} setWorkoutExercises={setWorkoutExercises} />
                    <div className="record-workout-buttons">
                        <button
                            className="record-workout-save-button"
                            onClick={onRecordWorkout}
                        >
                            Save Workout
                        </button>

                        <button
                            className="record-workout-discard-button"
                            onClick={onDiscard}
                        >
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default RecordWorkout