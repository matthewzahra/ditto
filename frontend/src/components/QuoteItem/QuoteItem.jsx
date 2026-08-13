import "./QuoteItem.css"

import bookmark from "../../assets/bookmark.svg"

function QuoteItem({ quoteText, author, title="", saved=false, onSave=null, id, onDelete=null }) {

    return (

        <div className="quote-item">

            {title && <h2>{title}</h2>}

            {title && <hr className="quote-separator" />}

            <p className="quote-text">"{quoteText}"</p>
            <p className="quote-author">- {author}</p>

            {onSave && !saved && <button className="save-button" onClick={onSave}><img src={bookmark} alt={"Save quote"} /></button>}
            {onDelete && <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>}

        </div>

    )


}

export default QuoteItem