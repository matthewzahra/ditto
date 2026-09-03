import { useState } from "react"

import apiRequest from "../../core/apiRequest"

import "./RecordCardio.css"

function RecordCardio({ type, recordCardioOpen, setRecordCardioOpen, setCardios }) {
    const [cardioTitle, setCardioTitle] = useState("")
    const [cardioDate, setCardioDate] = useState(new Date().toISOString().split("T")[0])
    const [cardioDistance, setCardioDistance] = useState("")
    const [cardioTime, setCardioTime] = useState("00:00:00")

    async function onRecordCardio() {
        // TODO if cardio title is blank add default cardio title
        if (cardioDistance < 0.01) {
            return
        }

        try {
            const response = await apiRequest(
                "/api/workout_tracker/add_cardio/",
                {
                    method: "POST",
                    body: {
                        exercise_type: type,
                        title: cardioTitle,
                        kms: cardioDistance,
                        time: cardioTime,
                        date: cardioDate,

                    }
                }
            )

            const data = await response.json()

            // TODO update below to set new cardio
            if (data.success) {
                setCardios(prev => ({
                    ...prev,
                    [type]: [
                        ...prev[type],
                        data.data
                    ]
                }))

                setCardioTitle("")
                setCardioDate(new Date().toISOString().split("T")[0])
                setCardioDistance(0)
                setCardioTime("00:00:00")
                setRecordCardioOpen(false)
            }
        } catch (err) {
            console.error("Failed to record cardio: ", err)
        }
    }

    function onDiscard() {
        setCardioTitle("")
        setCardioDate(new Date().toISOString().split("T")[0])
        setCardioDistance(0)
        setCardioTime("00:00:00")
        setRecordCardioOpen(false)
    }

    // TODO remake form layout to look better
    return (
        <>
        {recordCardioOpen && (
            <div className="record-cardio-overlay" onClick={() => setRecordCardioOpen(false)}>
                <div className="record-cardio-form" onClick={event => event.stopPropagation()}>
                    <h2>Record Cardio</h2>
                    <label htmlFor="cardio-title">
                        Title
                    </label>
                    <input 
                        id="cardio-title"
                        type="text"
                        placeholder="Title..."
                        value={cardioTitle}
                        onChange={event => setCardioTitle(event.target.value)}
                    />
                    <label htmlFor="cardio-date">
                        Date
                    </label>
                    <input 
                        id="cardio-date"
                        type="date"
                        value={cardioDate}
                        onChange={event => setCardioDate(event.target.value)}
                    />
                    <label htmlFor="cardio-distance">
                        Distance (km)
                    </label>
                    <input 
                        id="cardio-distance"
                        type="number"
                        min="0"
                        value={cardioDistance}
                        onChange={event => setCardioDistance(Number(event.target.value))}
                    />
                    <label htmlFor="cardio-time">
                        Time
                    </label>
                    <input
                        id="cardio-time"
                        type="time"
                        step="1"
                        value={cardioTime}
                        onChange={event => setCardioTime(event.target.value)}
                    />
                    <div className="record-cardio-buttons">
                        <button
                            className="record-cardio-save-button"
                            onClick={onRecordCardio}
                        >
                            Save Cardio
                        </button>

                        <button
                            className="record-cardio-discard-button"
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

export default RecordCardio