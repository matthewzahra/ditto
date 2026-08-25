import { useState, useEffect } from "react"

import "./WorkoutTracker.css"

import RunningGraph from "../../../components/RunningGraph/RunningGraph"
import WorkoutComponent from "../../../components/WorkoutComponent/WorkoutComponent"
import RecordExercise from "../../../components/RecordExercise/RecordExercise"
import RecordWorkout from "../../../components/RecordWorkout/RecordWorkout"
import apiRequest from "../../../core/apiRequest"

function WorkoutTracker() {
    const [exercises, setExercises] = useState([])
    const [recordExerciseOpen, setRecordExerciseOpen] = useState(false)
    const [workouts, setWorkouts] = useState([])
    const [recordWorkoutOpen, setRecordWorkoutOpen] = useState(false)

    // TODO remove below
    // temp data
    const runs = [
        {
            id: 1,
            workout_type: "RUN",
            date: "2026-08-20",
            num_rounds: 1,
            route: {
                kms: 5.0,
                time: "00:28:42",
            },
        },
        {
            id: 2,
            workout_type: "RUN",
            date: "2026-08-18",
            num_rounds: 1,
            route: {
                kms: 7.5,
                time: "00:44:38",
            },
        },
        {
            id: 3,
            workout_type: "RUN",
            date: "2026-08-15",
            num_rounds: 1,
            route: {
                kms: 10.0,
                time: "00:58:21",
            },
        },
        {
            id: 4,
            workout_type: "RUN",
            date: "2026-08-12",
            num_rounds: 1,
            route: {
                kms: 5.2,
                time: "00:30:15",
            },
        },
        {
            id: 5,
            workout_type: "RUN",
            date: "2026-08-09",
            num_rounds: 1,
            route: {
                kms: 8.0,
                time: "00:46:12",
            },
        },
        {
            id: 6,
            workout_type: "RUN",
            date: "2026-08-06",
            num_rounds: 1,
            route: {
                kms: 6.3,
                time: "00:36:47",
            },
        },
        {
            id: 7,
            workout_type: "RUN",
            date: "2026-08-03",
            num_rounds: 1,
            route: {
                kms: 5.0,
                time: "00:26:54",
            },
        },
        {
            id: 8,
            workout_type: "RUN",
            date: "2026-07-30",
            num_rounds: 1,
            route: {
                kms: 12.0,
                time: "01:10:32",
            },
        },
        {
            id: 9,
            workout_type: "RUN",
            date: "2026-07-27",
            num_rounds: 1,
            route: {
                kms: 6.5,
                time: "00:37:21",
            },
        },
        {
            id: 10,
            workout_type: "RUN",
            date: "2026-07-23",
            num_rounds: 1,
            route: {
                kms: 8.2,
                time: "00:47:36",
            },
        },
        {
            id: 11,
            workout_type: "RUN",
            date: "2026-07-20",
            num_rounds: 1,
            route: {
                kms: 5.5,
                time: "00:31:44",
            },
        },
        {
            id: 12,
            workout_type: "RUN",
            date: "2026-07-16",
            num_rounds: 1,
            route: {
                kms: 10.5,
                time: "01:01:18",
            },
        },
        {
            id: 13,
            workout_type: "RUN",
            date: "2026-07-12",
            num_rounds: 1,
            route: {
                kms: 7.0,
                time: "00:40:15",
            },
        },
        {
            id: 14,
            workout_type: "RUN",
            date: "2026-07-08",
            num_rounds: 1,
            route: {
                kms: 5.8,
                time: "00:33:42",
            },
        },
        {
            id: 15,
            workout_type: "RUN",
            date: "2026-07-03",
            num_rounds: 1,
            route: {
                kms: 9.0,
                time: "00:52:10",
            },
        },
        {
            id: 16,
            workout_type: "RUN",
            date: "2026-06-28",
            num_rounds: 1,
            route: {
                kms: 11.5,
                time: "01:07:24",
            },
        },
        {
            id: 17,
            workout_type: "RUN",
            date: "2026-06-24",
            num_rounds: 1,
            route: {
                kms: 6.0,
                time: "00:35:18",
            },
        },
        {
            id: 18,
            workout_type: "RUN",
            date: "2026-06-20",
            num_rounds: 1,
            route: {
                kms: 5.5,
                time: "00:32:41",
            },
        },
        {
            id: 19,
            workout_type: "RUN",
            date: "2026-06-15",
            num_rounds: 1,
            route: {
                kms: 8.5,
                time: "00:49:37",
            },
        },
        {
            id: 20,
            workout_type: "RUN",
            date: "2026-06-10",
            num_rounds: 1,
            route: {
                kms: 7.2,
                time: "00:42:16",
            },
        },
        {
            id: 21,
            workout_type: "RUN",
            date: "2026-06-05",
            num_rounds: 1,
            route: {
                kms: 5.0,
                time: "00:29:30",
            },
        },
        {
            id: 22,
            workout_type: "RUN",
            date: "2026-05-31",
            num_rounds: 1,
            route: {
                kms: 13.0,
                time: "01:16:42",
            },
        },
        {
            id: 23,
            workout_type: "RUN",
            date: "2026-05-25",
            num_rounds: 1,
            route: {
                kms: 7.5,
                time: "00:43:52",
            },
        },
        {
            id: 24,
            workout_type: "RUN",
            date: "2026-05-18",
            num_rounds: 1,
            route: {
                kms: 6.0,
                time: "00:34:27",
            },
        },
        {
            id: 25,
            workout_type: "RUN",
            date: "2026-05-10",
            num_rounds: 1,
            route: {
                kms: 9.5,
                time: "00:55:31",
            },
        },
        {
            id: 26,
            workout_type: "RUN",
            date: "2026-05-03",
            num_rounds: 1,
            route: {
                kms: 5.5,
                time: "00:31:48",
            },
        },
        {
            id: 27,
            workout_type: "RUN",
            date: "2026-04-26",
            num_rounds: 1,
            route: {
                kms: 8.0,
                time: "00:46:03",
            },
        },
        {
            id: 28,
            workout_type: "RUN",
            date: "2026-04-18",
            num_rounds: 1,
            route: {
                kms: 6.5,
                time: "00:38:22",
            },
        },
        {
            id: 29,
            workout_type: "RUN",
            date: "2026-04-10",
            num_rounds: 1,
            route: {
                kms: 10.0,
                time: "00:58:47",
            },
        },
        {
            id: 30,
            workout_type: "RUN",
            date: "2026-04-02",
            num_rounds: 1,
            route: {
                kms: 5.0,
                time: "00:29:12",
            },
        },
    ]

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
    
    return (
        <div className="workout-tracker-page">
            <h1>Workout tracker page</h1>
            <div className="running-container">
                <RunningGraph runs={runs} />
                <WorkoutComponent setRecordExerciseOpen={setRecordExerciseOpen} exercises={exercises} setExercises={setExercises} setRecordWorkoutOpen={setRecordWorkoutOpen} workouts={workouts} setWorkouts={setWorkouts} />
                {/* record exercise pop up, only displayed when recordExerciseOpen */}
                <RecordExercise recordExerciseOpen={recordExerciseOpen} setRecordExerciseOpen={setRecordExerciseOpen} setExercises={setExercises} />
                <RecordWorkout recordWorkoutOpen={recordWorkoutOpen} setRecordWorkoutOpen={setRecordWorkoutOpen} setWorkouts={setWorkouts} exercises={exercises} />

            </div>
        </div>
    )
}

export default WorkoutTracker