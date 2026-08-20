import "./WorkoutTracker.css"

import RunningGraph from "../../../components/RunningGraph/RunningGraph"

function WorkoutTracker() {
    // get workouts, display recent running, cycling and workouts in graph form

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
    ]

    return (
        <div className="workout-tracker-page">
            <h1>Workout tracker page</h1>
            <div className="running-container">
                <RunningGraph runs={runs} />
            </div>
        </div>
    )
}

export default WorkoutTracker