import { useState } from "react"

import "./Quote.css"

import QuoteItem from "../../../components/QuoteItem/QuoteItem"

function Quote() {
    const [currentQuote, setCurrentQuote] = useState({quoteText: "Lorem ipsum", author: "Nick", title: "Quote of the day", currentFavourite: false})

    function toggleFavourite() {
        setCurrentQuote(prev => ({
            ...prev,
            currentFavourite: !prev.currentFavourite
        }))
    }

    return (
        <div className="quote-page">
            <h1>Quote page</h1>
            <div className="quote-of-the-day-container">
                {/* TODO fetch quote of the day from backend */}
                <QuoteItem quoteText={currentQuote.quoteText} author={currentQuote.author} title={currentQuote.title} currentFavourite={currentQuote.currentFavourite} onFavourite={toggleFavourite} />
            </div>
        </div>
    )
}

export default Quote