import RunningGraph from "../RunningGraph/RunningGraph"

import "./RunningComponent.css"

function RunningComponent({ runs, setRecordRunOpen }) {
    return (
        <div className="running-component">
            <div className="running-component-header">
                <h2>Running</h2>
                <div className="running-component-header-actions">
                    <button className="record-run-button" onClick={() => setRecordRunOpen(true)}>Record Run</button>
                </div>
            </div>
            <RunningGraph runs={runs} />
        </div>
    )
}

export default RunningComponent