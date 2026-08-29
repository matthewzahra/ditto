import { useState, useEffect } from "react"

import "./WorkoutTracker.css"

import RunningComponent from "../../../components/RunningComponent/RunningComponent"
import WorkoutComponent from "../../../components/WorkoutComponent/WorkoutComponent"
import CyclingComponent from "../../../components/CyclingComponent/CyclingComponent"
import RecordExercise from "../../../components/RecordExercise/RecordExercise"
import RecordWorkout from "../../../components/RecordWorkout/RecordWorkout"
import RecordRun from "../../../components/RecordRun/RecordRun"
import RecordCycle from "../../../components/RecordCycle/RecordCycle"
import apiRequest from "../../../core/apiRequest"

function WorkoutTracker() {
    const [exercises, setExercises] = useState([])
    const [recordExerciseOpen, setRecordExerciseOpen] = useState(false)
    const [workouts, setWorkouts] = useState([])
    const [recordWorkoutOpen, setRecordWorkoutOpen] = useState(false)
    const [runs, setRuns] = useState([])
    const [recordRunOpen, setRecordRunOpen] = useState(false)
    const [cycles, setCycles] = useState([])
    const [recordCycleOpen, setRecordCycleOpen] = useState(false)
    const [selectedActivity, setSelectedActivity] = useState("workouts")

    // fetching saved exercises
    useEffect(() => {
        async function fetchExercises() {
            const response = await apiRequest("/api/workout_tracker/get_exercises/")
            const data = await response.json()
            setExercises(data.data)
        }
        fetchExercises()
    }, [])

    // fetching saved workouts
    useEffect(() => {
        async function fetchWorkouts() {
            const response = await apiRequest("/api/workout_tracker/get_workouts/")
            const data = await response.json()
            setWorkouts(data.data)
        }
        fetchWorkouts()
    }, [])

    // fetching saved cardio
    useEffect(() => {
        async function fetchCardio() {
            const response = await apiRequest("/api/workout_tracker/get_cardio")
            const data = await response.json()
            setRuns(data.data.RUN)
            setCycles(data.data.CYCLE)
        }
        fetchCardio()
    }, [])
    
    return (
        <div className="workout-tracker-page">
            <h1>Workout tracker page</h1>
            <div className="workout-tracker-page-selector">
                <div className={`selector-slider ${selectedActivity}`} />
                <button
                    className={selectedActivity === "workouts" ? "active" : ""}
                    onClick={() => setSelectedActivity("workouts")}
                >
                    Workouts
                </button>

                <button
                    className={selectedActivity === "running" ? "active" : ""}
                    onClick={() => setSelectedActivity("running")}
                >
                    Running
                </button>

                <button
                    className={selectedActivity === "cycling" ? "active" : ""}
                    onClick={() => setSelectedActivity("cycling")}
                >
                    Cycling
                </button>
            </div>
            <div className="activity-container">
                {selectedActivity === "running" && (<RunningComponent runs={runs} setRuns={setRuns} setRecordRunOpen={setRecordRunOpen} />)}

                {selectedActivity === "workouts" && (<WorkoutComponent setRecordExerciseOpen={setRecordExerciseOpen} exercises={exercises} setExercises={setExercises} setRecordWorkoutOpen={setRecordWorkoutOpen} workouts={workouts} setWorkouts={setWorkouts} />)}
                
                {selectedActivity === "cycling" && (<CyclingComponent cycles={cycles} setCycles={setCycles} setRecordCyclesOpen={setRecordCycleOpen} />)}

                {/* record exercise pop up, only displayed when recordExerciseOpen */}
                <RecordExercise recordExerciseOpen={recordExerciseOpen} setRecordExerciseOpen={setRecordExerciseOpen} setExercises={setExercises} />
                <RecordWorkout recordWorkoutOpen={recordWorkoutOpen} setRecordWorkoutOpen={setRecordWorkoutOpen} setWorkouts={setWorkouts} exercises={exercises} />
                <RecordRun recordRunOpen={recordRunOpen} setRecordRunOpen={setRecordRunOpen} setRuns={setRuns} />
                <RecordCycle recordCycleOpen={recordCycleOpen} setRecordCycleOpen={setRecordCycleOpen} setCycles={setCycles} />

            </div>
        </div>
    )
}

export default WorkoutTracker