import { useState, useEffect } from "react"

import apiRequest from "../../core/apiRequest"
import RecordWorkoutExercises from "../RecordWorkoutExercises/RecordWorkoutExercises"

import "./RecordWorkout.css"

function RecordWorkout({ recordWorkoutOpen, setRecordWorkoutOpen, setWorkouts, exercises }) {
    const [workoutTitle, setWorkoutTitle] = useState("")
    const [workoutDescription, setWorkoutDescription] = useState("")
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split("T")[0])
    const [numRounds, setNumRounds] = useState(1)
    const [workoutExercises, setWorkoutExercises] = useState([])

    // effect to initialise workout exercises
    useEffect(() => {
        setWorkoutExercises(exercises.map((exercise) => ({...exercise, reps: 0})))
    }, [exercises])

    async function onRecordWorkout() {
        // TODO if workout title is blank add default workout title
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
                        title: workoutTitle,
                        date: workoutDate,
                        info: workoutDescription,
                        num_rounds: numRounds,
                        exercises: recordedExercises.map(exercise => [exercise.id, exercise.reps])
                    }
                }
            )

            const data = await response.json()

            if (data.success) {
                setWorkouts(prev => [
                    ...prev,
                    data.data
                ])

                setWorkoutTitle("")
                setWorkoutDescription("")
                setWorkoutDate(new Date().toISOString().split("T")[0])
                setNumRounds(1)
                setWorkoutExercises(exercises.map((exercise) => ({...exercise, reps: 0})))
                setRecordWorkoutOpen(false)
            }
        } catch (err) {
            console.error("Failed to record workout: ", err)
        }
    }

    function onDiscard() {
        setWorkoutTitle("")
        setWorkoutDescription("")
        setWorkoutDate(new Date().toISOString().split("T")[0])
        setNumRounds(1)
        setWorkoutExercises(exercises.map((exercise) => ({...exercise, reps: 0})))
        setRecordWorkoutOpen(false)
    }

    // TODO remake form layout to look better
    return (
        <>
        {recordWorkoutOpen && (
            <div className="record-workout-overlay" onClick={() => setRecordWorkoutOpen(false)}>
                <div className="record-workout-form" onClick={event => event.stopPropagation()}>
                    <h2>Record Workout</h2>
                    <label htmlFor="workout-title">
                        Title
                    </label>
                    <input 
                        id="workout-title"
                        type="text"
                        placeholder="Title..."
                        value={workoutTitle}
                        onChange={event => setWorkoutTitle(event.target.value)}
                    />
                    <label htmlFor="workout-date">
                        Date
                    </label>
                    <input 
                        type="date"
                        value={workoutDate}
                        onChange={event => setWorkoutDate(event.target.value)}
                    />
                    <label htmlFor="workout-description">
                        Description
                    </label>
                    <textarea 
                        placeholder="Enter description..."
                        value={workoutDescription}
                        onChange={event => setWorkoutDescription(event.target.value)}
                    />
                    <label htmlFor="workout-num-rounds">
                        Sets
                    </label>
                    <input 
                        type="number"
                        value={numRounds}
                        onChange={event => setNumRounds(Number(event.target.value))}
                        min={1}
                    />
                    {/* TODO fix what happens when there are too many exercises (limit area given to exercises and add scrollbar) */}
                    <div className="record-workout-exercises">
                        <RecordWorkoutExercises exercises={exercises} workoutExercises={workoutExercises} setWorkoutExercises={setWorkoutExercises} />
                    </div>
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