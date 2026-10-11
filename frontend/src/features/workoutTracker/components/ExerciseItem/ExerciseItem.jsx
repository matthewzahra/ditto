import "./ExerciseItem.css"

function ExerciseItem({ exercise, setWorkoutExercises, setRecordWorkoutError }) {
    function onRepsChange(event) {
        const reps = Number(event.target.value)

        setWorkoutExercises(prev => 
            prev.map(item => 
                item.id === exercise.id
                ? {...item, reps}
                : item
            )
        )
    }
    return (
        <div className="exercise-item">
            <p>{exercise.name}</p>
            <input 
                type="number"
                value={exercise.reps}
                onChange={event => {
                    onRepsChange(event)
                    setRecordWorkoutError("")
                }}
                min={0}
            />
        </div>
    )
}

export default ExerciseItem