import "./QuoteItem.css"

function QuoteItem({ quoteText, author, title="", favourited=false, onFavourite=null }) {

    return (

        <div className="quote-item">

            {title && <h2>{title}</h2>}

            {title && <hr className="quote-separator" />}

            <p className="quote-text">"{quoteText}"</p>
            <p className="quote-author">- {author}</p>

            {onFavourite && <button className="favourite-button" onClick={onFavourite}>{favourited ? "★" : "☆"}</button>}

        </div>

    )


}

export default QuoteItem