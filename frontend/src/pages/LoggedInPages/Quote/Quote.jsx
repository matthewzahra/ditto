import { useState, useEffect } from "react"

import apiRequest from "../../../core/apiRequest"

import "./Quote.css"

import QuoteItem from "../../../components/QuoteItem/QuoteItem"
import QuoteGrid from "../../../components/quoteGrid/quoteGrid"

function Quote() {
    const [quoteOfTheDay, setQuoteOfTheDay] = useState({quoteText: "Lorem ipsum", author: "Nick", title: "Quote of the day", favourited: false})

    useEffect(() => {
        async function fetchDailyQuote() {
            const response = await apiRequest("/api/quotes/generate_daily_quote/")
            const data = await response.json()
            setQuoteOfTheDay(prev => ({...prev, quoteText: data.data.body, author: data.data.author}))
        }

        fetchDailyQuote()
    }, [])

    

    function toggleFavourite() {
        setQuoteOfTheDay(prev => ({
            ...prev,
            favourited: !prev.favourited
        }))
    }

    return (
        <div className="quote-page">
            <h1>Quote page</h1>
            <div className="quote-of-the-day-container">
                <QuoteItem quoteText={quoteOfTheDay.quoteText} author={quoteOfTheDay.author} title={quoteOfTheDay.title} favourited={quoteOfTheDay.favourited} onFavourite={toggleFavourite} />
            </div>
            <div className="saved-quotes-container">
                <div className="saved-quotes-header">
                    <h3>Saved Quotes</h3>
                </div>
                <QuoteGrid onFavourite={toggleFavourite} />
            </div>
        </div>
    )
}

export default Quote