import { useState, useEffect } from "react"

import apiRequest from "../../../core/apiRequest"

import "./Quote.css"

import QuoteItem from "../../../components/QuoteItem/QuoteItem"
import QuoteGrid from "../../../components/quoteGrid/quoteGrid"

function Quote() {
    const [quoteOfTheDay, setQuoteOfTheDay] = useState({quoteText: "Lorem ipsum", author: "Nick", title: "Quote of the day", saved: false, id: null})
    const [userQuotes, setUserQuotes] = useState([])

    useEffect(() => {
        async function fetchQuotes() {
            const quotesResponse = await apiRequest("/api/quotes/get_user_quotes/")
            const quotesData = await quotesResponse.json()
            const dailyResponse = await apiRequest("/api/quotes/generate_daily_quote/")
            const dailyData = await dailyResponse.json()

            const dailyQuote = dailyData.data

            const saved = quotesData.data.some(
                quote =>
                    quote.body === dailyQuote.body &&
                    quote.author === dailyQuote.author
            )

            setUserQuotes(quotesData.data)

            setQuoteOfTheDay({
                quoteText: dailyQuote.body,
                author: dailyQuote.author,
                title: "Quote of the day",
                saved: saved,
                id: saved ? quotesData.data.find(
                        quote =>
                            quote.body === dailyQuote.body &&
                            quote.author === dailyQuote.author
                    ).id: null
            })
        }

        fetchQuotes()
    }, [])


    async function onSave() {
        if (quoteOfTheDay.saved) {
            return
        }

        const response = await apiRequest(
            "/api/quotes/record_quote/",
            {
                method: "POST",
                body: {
                    body: quoteOfTheDay.quoteText,
                    author: quoteOfTheDay.author
                }
            }
        )

        const data = await response.json()

        if (data.success) {
            const savedQuote = {
                id: data.data.id,
                body: data.data.body,
                author: data.data.author
            }

            setQuoteOfTheDay(prev => ({
                ...prev,
                saved: true,
                id: data.data.id
            }))

            setUserQuotes(prev => [
                ...prev,
                savedQuote
            ])
        }
    }

    async function onDelete(id) {
        const response = await apiRequest(
            "/api/quotes/delete_quote/",
            {
            method: "DELETE",
            body: {
                quote_id: id
            }
        })

        if (response.ok) {
            setUserQuotes(prev => prev.filter(quote => quote.id !== id))

            if (quoteOfTheDay.id === id) {
                setQuoteOfTheDay(prev => ({
                    ...prev,
                    saved: false,
                    id: null
                }))
            }
        }
    }

    return (
        <div className="quote-page">
            <h1>Quote page</h1>
            <div className="quote-of-the-day-container">
                <QuoteItem quoteText={quoteOfTheDay.quoteText} author={quoteOfTheDay.author} title={quoteOfTheDay.title} saved={quoteOfTheDay.saved} onSave={onSave} id={quoteOfTheDay.id} />
            </div>
            <div className="saved-quotes-container">
                <div className="saved-quotes-header">
                    <h3>Saved Quotes</h3>
                </div>
                <QuoteGrid userQuotes={userQuotes} onDelete={onDelete}/>
            </div>
        </div>
    )
}

export default Quote