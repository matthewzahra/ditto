import { useState } from "react"

import apiRequest from "../../core/apiRequest"

import "./RecordCycle.css"

function RecordCycle({ recordCycleOpen, setRecordCycleOpen, setCycles }) {
    const [cycleTitle, setCycleTitle] = useState("")
    const [cycleDate, setCycleDate] = useState(new Date().toISOString().split("T")[0])
    const [cycleDistance, setCycleDistance] = useState("")
    const [cycleTime, setCycleTime] = useState("00:00:00")

    async function onRecordCycle() {
        // TODO if cycle title is blank add default cycle title
        if (cycleDistance < 0.1) {
            return
        }

        try {
            const response = await apiRequest(
                "/api/workout_tracker/add_cardio/",
                {
                    method: "POST",
                    body: {
                        exercise_type: "CYCLE",
                        title: cycleTitle,
                        kms: cycleDistance,
                        time: cycleTime,
                        date: cycleDate,

                    }
                }
            )

            const data = await response.json()

            // TODO update below to set new cycle
            if (data.success) {
                setCycles(prev => [
                    ...prev,
                    data.data
                ])

                setCycleTitle("")
                setCycleDate(new Date().toISOString().split("T")[0])
                setCycleDistance(0)
                setCycleTime("00:00:00")
                setRecordCycleOpen(false)
            }
        } catch (err) {
            console.error("Failed to record cycle: ", err)
        }
    }

    function onDiscard() {
        setCycleTitle("")
        setCycleDate(new Date().toISOString().split("T")[0])
        setCycleDistance(0)
        setCycleTime("00:00:00")
        setRecordCycleOpen(false)
    }

    // TODO remake form layout to look better
    return (
        <>
        {recordCycleOpen && (
            <div className="record-cycle-overlay" onClick={() => setRecordCycleOpen(false)}>
                <div className="record-cycle-form" onClick={event => event.stopPropagation()}>
                    <h2>Record Cycle</h2>
                    <label htmlFor="cycle-title">
                        Title
                    </label>
                    <input 
                        id="cycle-title"
                        type="text"
                        placeholder="Title..."
                        value={cycleTitle}
                        onChange={event => setCycleTitle(event.target.value)}
                    />
                    <label htmlFor="cycle-date">
                        Date
                    </label>
                    <input 
                        id="cycle-date"
                        type="date"
                        value={cycleDate}
                        onChange={event => setCycleDate(event.target.value)}
                    />
                    <label htmlFor="cycle-distance">
                        Distance (km)
                    </label>
                    <input 
                        id="cycle-distance"
                        type="number"
                        min="0"
                        value={cycleDistance}
                        onChange={event => setCycleDistance(Number(event.target.value))}
                    />
                    <label htmlFor="cycle-time">
                        Time
                    </label>
                    <input
                        id="cycle-time"
                        type="time"
                        step="1"
                        value={cycleTime}
                        onChange={event => setCycleTime(event.target.value)}
                    />
                    <div className="record-cycle-buttons">
                        <button
                            className="record-cycle-save-button"
                            onClick={onRecordCycle}
                        >
                            Save Cycle
                        </button>

                        <button
                            className="record-cycle-discard-button"
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

export default RecordCycle