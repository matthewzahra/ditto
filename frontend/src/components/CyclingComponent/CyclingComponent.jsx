import CyclingGraph from "../CyclingGraph/CyclingGraph"
import CyclingList from "../CyclingList/CyclingList"

import "./CyclingComponent.css"

function CyclingComponent({ cycles, setCycles, setRecordCyclesOpen }) {
    const sortedCycles = [...cycles].sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
        <div className="cycling-component">
            <div className="cycling-component-header">
                <h2>Cycling</h2>
                <div className="cycling-component-header-actions">
                    <button className="record-cycle-button" onClick={() => setRecordCyclesOpen(true)}>Record Cycle</button>
                </div>
            </div>
            <CyclingGraph cycles={sortedCycles} />
            <CyclingList cycles={sortedCycles} setCycles={setCycles} />
        </div>
    )
}

export default CyclingComponent