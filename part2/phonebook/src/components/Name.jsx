const Name = ({person, toggleDelete}) => {
    return (
        <div style={{display: 'flex', gap: '20px'}}><p style={{margin: '5px 0'}} key={person.name}>
            <b>{person.name}</b>: {person.number}</p>
            <button onClick={toggleDelete}>Delete</button>
        </div>)
}
export default Name
