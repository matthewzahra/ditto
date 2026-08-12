import { useState, useEffect } from "react"

import apiRequest from "../../../core/apiRequest"

import "./Quote.css"

import QuoteItem from "../../../components/QuoteItem/QuoteItem"
import QuoteGrid from "../../../components/quoteGrid/quoteGrid"

function Quote() {
    const [quoteOfTheDay, setQuoteOfTheDay] = useState({quoteText: "Lorem ipsum", author: "Nick", title: "Quote of the day", saved: false})

    useEffect(() => {
        async function fetchDailyQuote() {
            const response = await apiRequest("/api/quotes/generate_daily_quote/")
            const data = await response.json()
            setQuoteOfTheDay(prev => ({...prev, quoteText: data.data.body, author: data.data.author}))
        }

        fetchDailyQuote()
    }, [])

    

    async function toggleSave() {
        const method = quoteOfTheDay.saved ? "DELETE" : "POST"

        const response = await apiRequest(
            quoteOfTheDay.saved ? "/api/quotes/delete_quote/" : "/api/quotes/record_quote/", {
                method: method,
                body: {
                    body: quoteOfTheDay.quoteText,
                    author: quoteOfTheDay.author
                }
            }
        )

        const data = await response.json()
        console.log(data)

        if (data.success) {
            setQuoteOfTheDay(prev => ({
                ...prev,
                saved: !prev.saved
            }))
        }
    }

    return (
        <div className="quote-page">
            <h1>Quote page</h1>
            <div className="quote-of-the-day-container">
                <QuoteItem quoteText={quoteOfTheDay.quoteText} author={quoteOfTheDay.author} title={quoteOfTheDay.title} saved={quoteOfTheDay.saved} onSave={toggleSave} />
            </div>
            <div className="saved-quotes-container">
                <div className="saved-quotes-header">
                    <h3>Saved Quotes</h3>
                </div>
                <QuoteGrid />
            </div>
        </div>
    )
}

export default Quote