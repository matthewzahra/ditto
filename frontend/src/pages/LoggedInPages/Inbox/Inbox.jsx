import "./Inbox.css"

import InboxMessages from "../../../components/InboxMessages/InboxMessages"

function Inbox() {
        return (
        <div className="inbox-page">
            <h1>Inbox</h1>
            <InboxMessages />
        </div>
    )
}

export default Inbox