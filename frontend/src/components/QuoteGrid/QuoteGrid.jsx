import QuoteItem from "../QuoteItem/QuoteItem"

import "./quoteGrid.css"

function QuoteGrid({ onFavourite }) {

    // temp TODO remove below /////////////////////////////////
    const tempQuotes = [{
        quoteText: "quote 1",
        author: "author 1",
    },
    {
        quoteText: "quote 2",
        author: "author 2",
    },
    {
        quoteText: "quote 3",
        author: "author 3",
    },
    {
        quoteText: "quote 4",
        author: "author 4",
    },
    {
        quoteText: "quote 5",
        author: "author 5",
    },
    
    ]
    ///////////////////////////////////////////////////////////

    return (
        <div className="quote-grid">
            {tempQuotes.map((quote, index) => (
                <QuoteItem
                    key={index}
                    quoteText={quote.quoteText}
                    author={quote.author}
                />

            ))}
        </div>
    )

}

export default QuoteGrid