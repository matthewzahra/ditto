import { ResponsiveLine } from "@nivo/line"

import "./RunningGraph.css"

function RunningGraph({ runs }) {
    const data = [
        {
            id: "Distance",
            data: [...runs].sort((a, b) => new Date(a.date) - new Date(b.date)).map(run => ({x: run.date, y: run.route.kms}))
        }
    ]

    return (
        <div className="running-graph">
            <ResponsiveLine
            data={data}
            colors={["var(--primary)"]}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{type: "time", format: "%Y-%m-%d", precision: "day"}}
            xFormat="time:%Y-%m-%d"
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisBottom={{ legend: 'transportation', legendOffset: 36 }}
            axisLeft={{ legend: 'count', legendOffset: -40 }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'seriesColor' }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 80,
                    itemHeight: 22,
                    symbolShape: 'circle'
                }
            ]}
            />
        </div>
    )
}

export default RunningGraph