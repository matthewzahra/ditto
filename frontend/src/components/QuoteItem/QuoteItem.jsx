import {useState } from "react"

import "./QuoteItem.css"

function QuoteItem({ quoteText, author, title, favourited, onFavourite}) {

    return (

        <div className="quote-item">

            <h2>{title}</h2>

            <hr className="quote-separator" />

            <p className="quote-text">"{quoteText}"</p>
            <p className="quote-author">- {author}</p>

            <button className="favourite-button" onClick={onFavourite}>{favourited ? "★" : "☆"}</button>

        </div>

    )


}

export default QuoteItem