import { useState } from "react"

import apiRequest from "../../core/apiRequest"

import "./RecordRun.css"

function RecordRun({ recordRunOpen, setRecordRunOpen, setRuns }) {
    const [runTitle, setRunTitle] = useState("")
    const [runDate, setRunDate] = useState(new Date().toISOString().split("T")[0])
    const [runDistance, setRunDistance] = useState(0)
    const [runTime, setRunTime] = useState("00:00:00")

    async function onRecordRun() {
        // TODO if run title is blank add default run title
        if (runDistance < 0.1) {
            return
        }

        try {
            const response = await apiRequest(
                "/api/workout_tracker/add_cardio/",
                {
                    method: "POST",
                    body: {
                        exercise_type: "RUN",
                        title: runTitle,
                        kms: runDistance,
                        time: runTime,
                        date: runDate,

                    }
                }
            )

            const data = await response.json()

            // TODO update below to set new run
            if (data.success) {
                setRuns(prev => [
                    ...prev,
                    data.data
                ])

                setRunTitle("")
                setRunDate(new Date().toISOString().split("T")[0])
                setRunDistance(0)
                setRunTime("00:00:00")
                setRecordRunOpen(false)
            }
        } catch (err) {
            console.error("Failed to record run: ", err)
        }
    }

    function onDiscard() {
        setRunTitle("")
        setRunDate(new Date().toISOString().split("T")[0])
        setRunDistance(0)
        setRunTime("00:00:00")
        setRecordRunOpen(false)
    }

    // TODO remake form layout to look better
    return (
        <>
        {recordRunOpen && (
            <div className="record-run-overlay" onClick={() => setRecordRunOpen(false)}>
                <div className="record-run-form" onClick={event => event.stopPropagation()}>
                    <h2>Record Run</h2>
                    <input 
                        type="text"
                        placeholder="Title..."
                        value={runTitle}
                        onChange={event => setRunTitle(event.target.value)}
                    />
                    <input 
                        type="date"
                        value={runDate}
                        onChange={event => setRunDate(event.target.value)}
                    />
                    <input 
                        type="number"
                        value={runDistance}
                        onChange={event => setRunDistance(Number(event.target.value))}
                    />
                    <input
                        type="time"
                        step="1"
                        value={runTime}
                        onChange={event => setRunTime(event.target.value)}
                    />
                    <div className="record-run-buttons">
                        <button
                            className="record-run-save-button"
                            onClick={onRecordRun}
                        >
                            Save Workout
                        </button>

                        <button
                            className="record-run-discard-button"
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

export default RecordRun