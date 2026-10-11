import CardioGraph from "@/features/workoutTracker/components/CardioGraph/CardioGraph"
import CardioList from "@/features/workoutTracker/components/CardioList/CardioList"

import "./CardioComponent.css"

function CardioComponent({ type, cardios, setCardios, setRecordCardioOpen }) {
    const sortedCardios = [...(cardios[type] ?? [])].sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
        <div className="cardio-component">
            <div className="cardio-component-header">
                <h2>Cardio</h2>
                <div className="cardio-component-header-actions">
                    <button className="record-cardio-button" onClick={() => setRecordCardioOpen(true)}>Record {type === "RUN" ? "Run" : "Cycle"}</button>
                </div>
            </div>
            <CardioGraph type={type} cardios={sortedCardios} />
            <CardioList type={type} cardios={sortedCardios} setCardios={setCardios} />
        </div>
    )
}

export default CardioComponent