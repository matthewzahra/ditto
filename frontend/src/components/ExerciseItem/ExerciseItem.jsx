import "./ExerciseItem.css"

function ExerciseItem({ exercise }) {
    return (
        <div className="exercise-item">
            <p>{exercise}</p>
            <input 
                type="number"
            />
        </div>
    )
}

export default ExerciseItem