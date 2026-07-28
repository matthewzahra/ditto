import "./InboxNotification.css"

import trashCan from "../../assets/trashCan.svg"

function InboxNotification({ title, body, read, onRead, disabled, deleteMessage, expanded, onExpand }) {
    return (
        <div 
            className={`inbox-notification-${read ? "read" : "unread"} ${disabled ? "disabled" : ""} ${expanded ? "expanded" : ""}`}
            onClick={() => {
                if (!disabled) {
                    onExpand?.()
                    if (!read) {
                        onRead()
                    }
                }
            }}
        >
            <h3>{title}</h3>
            <p>{body}</p>

            <div className="inbox-notification-delete">
                <button type="button" 
                    onClick={(e) => {
                        e.stopPropagation()

                        if (!disabled) {
                            deleteMessage()
                        }
                    }}
                >
                    <img src={trashCan} alt="Delete" />
                </button>
            </div>
        </div>
    )
}

export default InboxNotification