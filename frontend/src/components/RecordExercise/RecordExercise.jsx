import { useState } from "react"

import apiRequest from "../../core/apiRequest"

import "./RecordExercise.css"

function RecordExercise({ recordExerciseOpen, setRecordExerciseOpen, setExercises }) {
    const [exerciseName, setExerciseName] = useState("")

    // function to add exercise to database
    async function onRecordExercise() {
        const name = exerciseName.trim()
        if (!name) {
            return
        }

        try {
            const response = await apiRequest(
                "/api/workout_tracker/add_exercise/",
                {
                    method: "POST",
                    body: { name }
                }
            )

            const data = await response.json()

            // TODO fix below so that new exercises are stored properly (more than just a name, includes unique id)
            if (data.success) {
                setExercises(prev => [
                    ...prev,
                    { name }
                ])

                setExerciseName("")
                setRecordExerciseOpen(false)
            }
        } catch (err) {
            console.error("Failed to record exercise: ", err)
        }
    }

    // function to discard currently typed exercise and close pop up
    function onDiscard() {
        setExerciseName("")
        setRecordExerciseOpen(false)
    }

    return (
        <>
        {recordExerciseOpen && (
            <div className="record-exercise-overlay" onClick={() => setRecordExerciseOpen(false)}>
                <div className="record-exercise-form" onClick={event => event.stopPropagation()}>
                    <h2>Record Exercise</h2>
                    <input 
                        type="text"
                        placeholder="Exercise..."
                        value={exerciseName}
                        onChange={event => setExerciseName(event.target.value)}
                    />
                    <div className="record-exercise-buttons">
                        <button
                            className="record-exercise-save-button"
                            onClick={onRecordExercise}
                        >
                            Save exercise
                        </button>

                        <button
                            className="record-exercise-discard-button"
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

export default RecordExercise