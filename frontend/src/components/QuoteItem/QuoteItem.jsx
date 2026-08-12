import "./QuoteItem.css"

import bookmark from "../../assets/bookmark.svg"
import bookmarkFilled from "../../assets/bookmarkFilled.svg"

function QuoteItem({ quoteText, author, title="", saved=false, onSave=null }) {

    return (

        <div className="quote-item">

            {title && <h2>{title}</h2>}

            {title && <hr className="quote-separator" />}

            <p className="quote-text">"{quoteText}"</p>
            <p className="quote-author">- {author}</p>

            {onSave && <button className="save-button" onClick={onSave}><img src={saved ? bookmarkFilled : bookmark} alt={saved? "Unsave quote" : "Save quote"} /></button>}

        </div>

    )


}

export default QuoteItem