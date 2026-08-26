import { useState, useRef, useEffect } from "react"
import { ResponsiveLine } from "@nivo/line"

import "./RunningGraph.css"

function RunningGraph({ runs }) {
    const [timeSpan, setTimeSpan] = useState("weekly")
    const [timeSpanOpen, setTimeSpanOpen] = useState(false)

    const timeSpanRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (timeSpanRef.current && !timeSpanRef.current.contains(event.target)) {
                setTimeSpanOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    if (runs.length === 0) {
        return null
    }

    const sortedRuns = [...runs].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )

    const earliestDate = new Date(sortedRuns[0].date)
    const latestDate = new Date(
        sortedRuns[sortedRuns.length - 1].date
    )

    const weeks = []
    const months = []

    // ----------------
    // WEEKS
    // ----------------

    let currentWeek = new Date(earliestDate)

    // Move to Monday of the week containing the earliest run
    const day = currentWeek.getDay()
    const difference = day === 0 ? -6 : 1 - day

    currentWeek.setDate(currentWeek.getDate() + difference)

    while (currentWeek <= latestDate) {

        const weekStart = new Date(currentWeek)

        const weekEnd = new Date(currentWeek)
        weekEnd.setDate(weekEnd.getDate() + 6)

        const distance = sortedRuns
            .filter(run => {
                const date = new Date(run.date)

                return date >= weekStart && date <= weekEnd
            })
            .reduce(
                (total, run) => total + run.kms,
                0
            )

        weeks.push({
            start: weekStart,
            end: weekEnd,
            distance
        })

        currentWeek.setDate(currentWeek.getDate() + 7)
    }

    // ----------------
    // MONTHS
    // ----------------

    let currentMonth = new Date(
        earliestDate.getFullYear(),
        earliestDate.getMonth(),
        1
    )

    while (currentMonth <= latestDate) {

        const monthStart = new Date(currentMonth)

        const monthEnd = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            0
        )

        const distance = sortedRuns
            .filter(run => {
                const date = new Date(run.date)

                return date >= monthStart && date <= monthEnd
            })
            .reduce(
                (total, run) => total + run.kms,
                0
            )

        months.push({
            start: monthStart,
            end: monthEnd,
            distance
        })

        currentMonth.setMonth(currentMonth.getMonth() + 1)
    }

    // ----------------
    // RUNNING GRAPH
    // ----------------

    const data = [
        {
            id: "Distance",
            data: timeSpan === "weekly" 
            ? weeks.map(week => ({x: week.start, y: week.distance})) 
            : months.map(month => ({x: month.start, y: month.distance}))
        }
    ]

    return (
        <div className="running-graph">
            <div className="running-graph-header">
                <div>
                    <p>Distance over time</p>
                </div>
                <div className="time-span-container" ref={timeSpanRef}>
                    <button className="time-span-button" onClick={() => setTimeSpanOpen(prev => !prev)}>{timeSpan}</button>
                    {timeSpanOpen && (
                        <div className="time-span-dropdown">
                            <button onClick={() => {setTimeSpan(timeSpan === "weekly" ? "monthly" : "weekly"); setTimeSpanOpen(false)}}>{timeSpan === "weekly" ? "monthly" : "weekly"}</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="running-graph-chart">
                <ResponsiveLine
                    data={data}

                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 45,
                        left: 55
                    }}

                    xScale={{
                        type: "time",
                        format: "native",
                        precision: "day"
                    }}

                    xFormat="time:%d %b"

                    yScale={{
                        type: "linear",
                        min: 0,
                        max: "auto",
                        stacked: false,
                        reverse: false
                    }}

                    colors={["var(--primary)"]}

                    curve="linear"
                    lineWidth={3}

                    enableArea={true}
                    areaOpacity={0.15}

                    pointSize={0}
                    pointColor="var(--card-background)"
                    pointBorderWidth={0}
                    pointBorderColor={{ from: "serieColor" }}

                    enableGridX={true}
                    gridYValues={5}

                    axisBottom={{
                        tickSize: 8,
                        tickPadding: 4,
                        format: "%d %b"
                    }}

                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 10,
                        legend: "Distance (km)",
                        legendOffset: -45,
                        legendPosition: "middle"
                    }}

                    enableCrosshair={true}
                    crosshairType="x"

                    useMesh={true}

                    tooltip={({ point }) => (
                        <div className="running-graph-tooltip">
                            <strong>{point.data.xFormatted}</strong>
                            <span>{point.data.yFormatted} km</span>
                        </div>
                    )}

                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fill: "var(--muted)"
                                },
                                line: {
                                    stroke: "var(--border)"
                                }
                            },
                            domain: {
                                line: {
                                    stroke: "var(--border)"
                                }
                            },
                            legend: {
                                text: {
                                    fill: "var(--text)"
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default RunningGraph