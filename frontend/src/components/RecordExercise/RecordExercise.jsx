import "./RecordExercise.css"

function RecordExercise({ recordExerciseOpen, setRecordExerciseOpen }) {
    return (
        <>
        {recordExerciseOpen && (
            <div className="record-exercise-overlay" onClick={() => setRecordExerciseOpen(false)}></div>
        )}
        </>
    )
}

export default RecordExercise