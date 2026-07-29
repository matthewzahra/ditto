import "./Quote.css"

import QuoteItem from "../../../components/QuoteItem/QuoteItem"

function Quote() {
        return (
        <div>
            <h1>Quote page</h1>
            <QuoteItem quoteText="Lorem ipsum" author="Nick" />
        </div>
    )
}

export default Quote