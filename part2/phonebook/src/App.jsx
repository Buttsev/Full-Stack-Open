import {useEffect, useState} from 'react'
import Names from './components/Names.jsx'
import PersonsForm from "./components/PersonsForm.jsx";
import Filter from "./components/Filter.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([
        // {name: 'Arto Hellas', number: '040-123456', id: 1},
        // {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        // {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        // {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('Arto Hellas')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    //Name contains filter
    // const personsToShow = persons.filter((person) =>
    //     person.name.toLowerCase().includes(filter.trim().toLowerCase())
    // )

    //Name starts with filter
    // const personsToShow = persons.filter((person) =>
    //     person.name.toLowerCase().startsWith(filter.trim().toLowerCase())
    // )

    //Name or surname start with filter or both start with filter
    const normalizedFilter = filter.trim().toLowerCase()

    const personsToShow = persons.filter((person) => {
        const fullName = person.name.toLowerCase()
        const nameParts = fullName.split(/\s+/)

        return (
            fullName.startsWith(normalizedFilter) ||
            nameParts.some((part) => part.startsWith(normalizedFilter))
        )
    })

    const addPerson = (e) => {
        e.preventDefault()
        if (newName === '' || newName === ' ') {
            window.alert('Please enter a name')
            return
        }
        if (newNumber === '' || newNumber === ' ') {
            window.alert('Please enter a number')
            return
        }
        const newPersonObject = {name: String(newName), number: String(newNumber)}
        if (persons.some(person => person.name === newPersonObject.name)) {
            window.alert(`${newPersonObject.name} is already registered`)
            setNewName('')
            return
        }
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
    }
    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    return (<div>
        <h2>Phonebook</h2>
        <Filter handleFilterChange={handleFilterChange} filter={filter}/>
        <PersonsForm handleSubmit={addPerson} handleNameChange={handleNameChange}
                     handleNumberChange={handleNumberChange} name={newName}
                     number={newNumber}/>
        <h2>Numbers</h2>
        <Names persons={personsToShow}/>


    </div>)
}

export default App