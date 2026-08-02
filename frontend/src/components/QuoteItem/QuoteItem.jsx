import {useState } from "react"

import "./QuoteItem.css"

function QuoteItem({ quoteText, author, title, currentFavourite, onFavourite}) {

    return (

        <div className="quote-item">

            <h2>{title}</h2>

            <hr className="quote-separator" />

            <p className="quote-text">"{quoteText}"</p>
            <p className="quote-author">- {author}</p>

            <button className="favourite-button" onClick={onFavourite}>{currentFavourite ? "★" : "☆"}</button>

        </div>

    )


}

export default QuoteItem