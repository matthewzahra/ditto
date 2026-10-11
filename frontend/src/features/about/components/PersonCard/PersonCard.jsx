import "./PersonCard.css"

function PersonCard({ name, role, picture }) {
    return (
        <div className="person-card">

            <img
                className="person-card-picture"
                src={picture}
                alt={name}
            />
            
            <h3>{name}</h3>
            <p>{role}</p>
        </div>
    )
}

export default PersonCard