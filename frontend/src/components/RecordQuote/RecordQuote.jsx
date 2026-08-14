import apiRequest from "../../core/apiRequest"

import "./RecordQuote.css"

function RecordQuote({ recordQuoteOpen, setRecordQuoteOpen, recordQuoteText, setRecordQuoteText, recordQuoteAuthor, setRecordQuoteAuthor, setUserQuotes }) {

    // function to handle when a user submits a quote for saving
    async function onRecordQuote() {
        if (!recordQuoteText.trim()) {
            return
        }
        try {
            const requestBody = {
                body: recordQuoteText.trim(),
            }
            const author = recordQuoteAuthor.trim()

            if (author) {
                requestBody.author = author
            }

            const response = await apiRequest(
                "/api/quotes/record_quote/",
                {
                    method: "POST",
                    body: requestBody
                }
            )

            const data = await response.json()

            if (data.success) {
                const savedQuote = {
                    id: data.data.id,
                    body: data.data.body,
                    author: data.data.author
                }

                setUserQuotes(prev => [
                    ...prev,
                    savedQuote
                ])

                setRecordQuoteText("")
                setRecordQuoteAuthor("")
                setRecordQuoteOpen(false)
            }
        } catch (err) {
            console.error("Failed to record quote:", err)
        }
    }

    function onDiscard() {
        setRecordQuoteText("")
        setRecordQuoteAuthor("")
        setRecordQuoteOpen(false)
    }

    // returning the record quote form
    return (
        <>
        {recordQuoteOpen && (
            <div className="record-quote-overlay" onClick={() => setRecordQuoteOpen(false)}>
                <div className="record-quote-form" onClick={event => event.stopPropagation()}>
                    <h2>Record Quote</h2>

                    <textarea
                        placeholder="Enter quote..."
                        value={recordQuoteText}
                        onChange={event => setRecordQuoteText(event.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Author"
                        value={recordQuoteAuthor}
                        onChange={event => setRecordQuoteAuthor(event.target.value)}
                    />

                    <div className="record-quote-buttons">
                        <button className="record-quote-save-button" onClick={onRecordQuote}>
                            Save quote
                        </button>

                        <button className="record-quote-discard-button" onClick={onDiscard}>
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default RecordQuote