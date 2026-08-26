import { useState, useEffect } from "react"

import QuoteItem from "../QuoteItem/QuoteItem"

import "./QuoteGrid.css"

function QuoteGrid({ userQuotes, onDelete }) {
    const [displayedQuotes, setDisplayedQuotes] = useState([])

    useEffect(() => {
        setDisplayedQuotes(prev => {
            if (prev.length === 0) {
                const shuffled = [...userQuotes]

                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
                }
                
                return shuffled
            }

            const newQuotes = userQuotes.filter(quote => !prev.some(existing => existing.id === quote.id))

            const existingQuotes = prev.filter(quote => userQuotes.some(existing => existing.id === quote.id))

            return [...existingQuotes, ...newQuotes]
        })
    }, [userQuotes])
    return (
        <div className="quote-grid">
            {displayedQuotes.map((quote) => (
                <QuoteItem
                    key={quote.id}
                    quoteText={quote.body}
                    author={quote.author}
                    onDelete={onDelete}
                    id={quote.id}
                />
            ))}
        </div>
    )

}

export default QuoteGrid