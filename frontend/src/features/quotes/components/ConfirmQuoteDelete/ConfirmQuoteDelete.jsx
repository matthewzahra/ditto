import "./ConfirmQuoteDelete.css"

function ConfirmQuoteDelete({ confirmDeleteOpen, setConfirmDeleteOpen, onConfirm, quoteToDelete}) {

    function onCancel() {
        setConfirmDeleteOpen(false)
    }

    function onDelete() {
        onConfirm()
        setConfirmDeleteOpen(false)
    }

    return (
        <>
        {confirmDeleteOpen && (
            <div
                className="confirm-quote-delete-overlay"
                onClick={onCancel}
            >
                <div
                    className="confirm-quote-delete-form"
                    onClick={event => event.stopPropagation()}
                >
                    <h2>Delete Quote?</h2>
                    <p className="confirm-delete-quote-text">"{quoteToDelete.quoteText}"</p>
                    <p className="confirm-delete-author">- {quoteToDelete.author}</p>

                    <p>
                        Are you sure you want to delete this quote?
                    </p>

                    <div className="confirm-quote-delete-buttons">
                        <button
                            className="confirm-quote-delete-button"
                            onClick={onDelete}
                        >
                            Delete
                        </button>

                        <button
                            className="confirm-quote-delete-cancel-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ConfirmQuoteDelete