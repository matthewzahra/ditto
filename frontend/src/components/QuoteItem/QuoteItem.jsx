import "./QuoteItem.css"

function QuoteItem({ quoteText, author}) {

    return (

        <div className="quote-item">
            <p>"{quoteText}" - {author}</p>

        </div>

    )


}

export default QuoteItem