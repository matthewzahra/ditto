import { useState, useRef, useEffect } from "react"

import { ResponsiveLine } from "@nivo/line"

import "./CardioGraph.css"

function parseLocalDate(dateString) {

    const [year, month, day] = dateString
        .split("-")
        .map(Number)

    return new Date(year, month - 1, day)
}

function CardioGraph({ type, cardios }) {
	// TODO add way for users to choose selected time span of displayed cardios (i.e. year vs last 6 months vs last month or 2026 vs 2025 etc.)
    const [timeSpan, setTimeSpan] = useState("weekly")

    const [timeSpanOpen, setTimeSpanOpen] = useState(false)

    const timeSpanRef = useRef(null)

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                timeSpanRef.current &&
                !timeSpanRef.current.contains(event.target)
            ) {
                setTimeSpanOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [])

    if (cardios.length === 0) {
        return null
    }

    const earliestDate = parseLocalDate(
        cardios[cardios.length - 1].date
    )

    const latestDate = parseLocalDate(
        cardios[0].date
    )

    const weeks = []
    const months = []

    // ----------------
    // WEEKS
    // ----------------

    let currentWeek = new Date(earliestDate)

    // Move to Monday of the week containing the earliest cardio

    const day = currentWeek.getDay()

    const difference = day === 0
        ? -6
        : 1 - day

    currentWeek.setDate(
        currentWeek.getDate() + difference
    )

    while (currentWeek <= latestDate) {

        const weekStart = new Date(currentWeek)

        const weekEnd = new Date(currentWeek)

        weekEnd.setDate(
            weekEnd.getDate() + 6
        )

        const distance = cardios
            .filter(cardio => {

                const date = parseLocalDate(cardio.date)

                return date >= weekStart && date <= weekEnd
            })
            .reduce(
                (total, cardio) =>
                    total + Number(cardio.kms),
                0
            )

        weeks.push({
            start: weekStart,
            end: weekEnd,
            distance
        })

        currentWeek.setDate(
            currentWeek.getDate() + 7
        )
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

        const distance = cardios
            .filter(cardio => {

                const date = parseLocalDate(cardio.date)

                return date >= monthStart && date <= monthEnd
            })
            .reduce(
                (total, cardio) =>
                    total + Number(cardio.kms),
                0
            )

        months.push({
            start: monthStart,
            end: monthEnd,
            distance
        })

        currentMonth.setMonth(
            currentMonth.getMonth() + 1
        )
    }

    // ----------------
    // GRAPH DATA
    // ----------------

    const data = [
        {
            id: "Distance",

            data: timeSpan === "weekly"
                ? weeks.map(week => ({
                    x: week.start,
                    y: week.distance
                }))
                : months.map(month => ({
                    x: month.start,
                    y: month.distance
                }))
        }
    ]

    return (

        <div className="cardio-graph">

            <div className="cardio-graph-header">

                <div>

                    <h3>
                        Distance over time
                    </h3>

                    <span>
                        {timeSpan === "weekly"
                            ? "Weekly distance"
                            : "Monthly distance"
                        }
                    </span>

                </div>

                <div
                    className="time-span-container"
                    ref={timeSpanRef}
                >

                    <button
                        className="time-span-button"
                        onClick={() =>
                            setTimeSpanOpen(prev => !prev)
                        }
                    >
                        {timeSpan}
                    </button>

                    {timeSpanOpen && (

                        <div className="time-span-dropdown">

                            <button
                                onClick={() => {

                                    setTimeSpan(
                                        timeSpan === "weekly"
                                            ? "monthly"
                                            : "weekly"
                                    )

                                    setTimeSpanOpen(false)
                                }}
                            >
                                {timeSpan === "weekly"
                                    ? "Monthly"
                                    : "Weekly"
                                }
                            </button>

                        </div>

                    )}

                </div>

            </div>

            <div className="cardio-graph-chart">

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
                        precision: "day",
                        useUTC: false
                    }}

                    xFormat="time:%d %b"

                    yScale={{
                        type: "linear",
                        min: 0,
                        max: "auto",
                        stacked: false,
                        reverse: false,
                        nice: true
                    }}

                    colors={[
                        "var(--primary)"
                    ]}

                    curve="linear"

                    lineWidth={2.5}

                    enableArea={true}

                    areaOpacity={0.08}

                    enablePoints={true}

                    pointSize={5}

                    pointColor="var(--card-background)"

                    pointBorderWidth={2}

                    pointBorderColor={{
                        from: "serieColor"
                    }}

                    enableGridX={false}

                    enableGridY={true}

                    gridYValues={5}

                    axisBottom={{
						tickValues: timeSpan === "weekly"
							? weeks.map(week => week.start)
							: months.map(month => month.start),

						tickSize: 0,

						tickPadding: 10,

						format: value => {
							const date = new Date(value)

							return timeSpan === "weekly"
								? date.toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "short"
								})
								: date.toLocaleDateString("en-GB", {
									month: "short"
								})
						}
					}}

                    axisLeft={{

                        tickSize: 0,

                        tickPadding: 10,

                        format: value => `${value}`,

                        legend: "Distance (km)",

                        legendOffset: -45,

                        legendPosition: "middle"
                    }}

                    enableCrosshair={true}

                    crosshairType="x"

                    useMesh={true}

                    tooltip={({ point }) => (

                        <div className="cardio-graph-tooltip">

                            <span className="cardio-graph-tooltip-date">
                                {point.data.xFormatted}
                            </span>

                            <strong>
                                {point.data.yFormatted} km
                            </strong>

                        </div>

                    )}

                    theme={{

                        grid: {

                            line: {

                                stroke: "var(--border)",

                                strokeWidth: 1,

                                strokeOpacity: 0.35
                            }
                        },

                        crosshair: {

                            line: {

                                stroke: "var(--muted)",

                                strokeWidth: 1,

                                strokeOpacity: 0.5,

                                strokeDasharray: "4 4"
                            }
                        },

                        axis: {

                            ticks: {

                                text: {

                                    fill: "var(--muted)",

                                    fontSize: 12
                                }
                            },

                            legend: {

                                text: {

                                    fill: "var(--text)",

                                    fontSize: 12
                                }
                            },

                            domain: {

                                line: {

                                    stroke: "var(--border)",

                                    strokeWidth: 1
                                }
                            }
                        },

                        tooltip: {

                            container: {

                                background: "var(--card-background)",

                                color: "var(--text)",

                                border: "1px solid var(--border)",

                                borderRadius: "8px",

                                boxShadow:
                                    "0 4px 12px rgba(0, 0, 0, 0.12)"
                            }
                        }
                    }}

                />

            </div>

        </div>
    )
}

export default CardioGraph