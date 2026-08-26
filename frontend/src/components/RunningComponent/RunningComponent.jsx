import RunningGraph from "../RunningGraph/RunningGraph"
import RunningList from "../RunningList/RunningList"

import "./RunningComponent.css"

function RunningComponent({ runs, setRuns, setRecordRunOpen }) {
    const sortedRuns = [...runs].sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
        <div className="running-component">
            <div className="running-component-header">
                <h2>Running</h2>
                <div className="running-component-header-actions">
                    <button className="record-run-button" onClick={() => setRecordRunOpen(true)}>Record Run</button>
                </div>
            </div>
            <RunningGraph runs={sortedRuns} />
            <RunningList runs={sortedRuns} setRuns={setRuns} />
        </div>
    )
}

export default RunningComponent