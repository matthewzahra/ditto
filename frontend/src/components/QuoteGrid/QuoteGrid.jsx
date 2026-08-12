import { useState, useEffect } from "react"

import apiRequest from "../../core/apiRequest"

import QuoteItem from "../QuoteItem/QuoteItem"

import "./quoteGrid.css"

function QuoteGrid({ onFavourite }) {
    const [userQuotes, setUserQuotes] = useState([])

    useEffect(() => {
        async function fetchUserQuotes() {
            const response = await apiRequest("/api/quotes/get_user_quotes/")
            const data = await response.json()
            console.log(data)
            setUserQuotes(data.data)
        }

        fetchUserQuotes()
    }, [])


    return (
        <div className="quote-grid">
            {userQuotes.map((quote, index) => (
                <QuoteItem
                    key={index}
                    quoteText={quote.body}
                    author={quote.author}
                />

            ))}
        </div>
    )

}

export default QuoteGrid