import "./ConfirmRestaurantDelete.css"

function ConfirmRestaurantDelete({ confirmDeleteOpen, setConfirmDeleteOpen, onConfirm, restaurantToDelete }) {

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
                    className="confirm-restaurant-delete-overlay"
                    onClick={onCancel}
                >
                    <div
                        className="confirm-restaurant-delete-form"
                        onClick={event => event.stopPropagation()}
                    >
                        <h2>Delete Restaurant?</h2>

                        <p className="confirm-delete-restaurant-name">
                            "{restaurantToDelete.name}"
                        </p>

                        <p>
                            Are you sure you want to delete this restaurant?
                        </p>

                        <div className="confirm-restaurant-delete-buttons">
                            <button
                                className="confirm-restaurant-delete-button"
                                onClick={onDelete}
                            >
                                Delete
                            </button>

                            <button
                                className="confirm-restaurant-delete-cancel-button"
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

export default ConfirmRestaurantDelete