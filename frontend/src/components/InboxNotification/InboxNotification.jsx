import "./InboxNotification.css"

function InboxNotification({ title, body }) {

    return (
        <div className="inbox-notification">
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
    )

}

export default InboxNotification