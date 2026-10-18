const Names = (persons) => {

    return (persons.persons.map((person) => {
        return (

            <p key={person.name}><b>{person.name}</b>: {person.number}</p>
        )
    }))
}

export default Names
