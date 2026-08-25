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
        setWorkoutExercises(exercises.map((exercise) => ({...exercise, reps: 0})))
    }, [exercises])

    async function onRecordWorkout() {
        if (workoutExercises.reduce((total, exercise) => (total + exercise.reps), 0) === 0) {
            return
        }

        const recordedExercises = workoutExercises.filter(exercise => exercise.reps !== 0)

        try {
            const response = await apiRequest(
                "/api/workout_tracker/add_workout/",
                {
                    method: "POST",
                    body: {
                        date: workoutDate,
                        num_rounds: numRounds,
                        exercises: recordedExercises.map(exercise => [exercise.id, exercise.reps])
                    }
                }
            )

            const data = await response.json()

            // TODO update below to set new workout
            if (data.success) {
                setWorkouts(prev => [
                    ...prev,
                    {}
                ])

                setWorkoutDate(new Date().toISOString().split("T")[0])
                setNumRounds(1)
                setWorkoutExercises(exercises.map((exercise) => ({...exercise, reps: 0})))
                setRecordWorkoutOpen(false)
            }
        } catch (err) {
            console.error("Failed to record Workout: ", err)
        }
    }

    function onDiscard() {
        setWorkoutDate(new Date().toISOString().split("T")[0])
        setNumRounds(1)
        setWorkoutExercises(exercises.map((exercise) => ({...exercise, reps: 0})))
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
                        onChange={event => setNumRounds(Number(event.target.value))}
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