import { ResponsiveLine } from "@nivo/line"

import "./RunningGraph.css"

function RunningGraph({ runs }) {

    const earliestYear = Math.min(...runs.map(run => new Date(run.date).getFullYear()))

    const latestYear = Math.max(...runs.map(run => new Date(run.date).getFullYear()))

    const yearlyData = []

    for (let year = earliestYear; year <= latestYear; year++) {
        const totalDistance = runs.filter(run => new Date(run.date).getFullYear() === year).reduce((total, run) => total + run.route.kms, 0)

        yearlyData.push({year, distance: totalDistance})
    }

    const data = [
        {
            id: "Distance",
            data: [...runs]
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(run => ({
                    x: run.date,
                    y: run.route.kms
                }))
        }
    ]

    return (
        <div className="running-graph">
            <div className="running-graph-header">
                <div>
                    <h2>Running</h2>
                    <p>Distance over time</p>
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
                        format: "%Y-%m-%d",
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