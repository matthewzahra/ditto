import "./InboxNotification.css"

import trashCan from "../../assets/trash-can.svg"

function InboxNotification({ title, body, read, onRead, disabled, deleteMessage }) {
    if (read) {
        return (
            <>
                <div className="inbox-notification-read">
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <div className="inbox-notification-delete">
                        <button onClick={!disabled ? deleteMessage: undefined}><img src={trashCan} /></button>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={`inbox-notification-unread ${disabled ? "disabled" : ""}`} onClick={!disabled ? onRead: undefined}>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <div className="inbox-notification-delete">
                        <button onClick={!disabled ? deleteMessage: undefined}><img src={trashCan} /></button>
                    </div>
                </div>
            </>
        )
    }
}

export default InboxNotification