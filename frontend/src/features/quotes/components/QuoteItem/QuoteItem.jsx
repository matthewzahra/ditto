import bookmark from "@/assets/bookmark.svg"
import trashCan from "@/assets/trashCan.svg"

import "./QuoteItem.css"

function QuoteItem({ quoteText, author, title="", saved=false, onSave=null, id, onDelete=null }) {

    return (

        <div className="quote-item">

            {title && <h2>{title}</h2>}

            {title && <hr className="quote-separator" />}

            <p className="quote-text">"{quoteText}"</p>
            <p className="quote-author">- {author}</p>

            {onSave && !saved && <button className="quote-item-save-button" onClick={onSave}><img src={bookmark} alt={"Save quote"} /></button>}
            {onDelete && <button className="quote-item-delete-button" onClick={() => onDelete({quoteText: quoteText, author: author, id: id})}><img src={trashCan} alt="Delete" /></button>}

        </div>

    )


}

export default QuoteItem