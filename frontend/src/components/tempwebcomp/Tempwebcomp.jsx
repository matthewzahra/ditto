import { useWebSocket } from "@/context/WebSocketContext"

import { useEffect } from "react"

function Tempwebcomp() {
    const { sendMessage } = useWebSocket()


    useEffect(() => {
        sendMessage({type: "testing 1", messageID: 123})
    }, [sendMessage])
    

    return (

        <div className="temp">
            <h1>Temp</h1>
        </div>

    )


}

export default Tempwebcomp