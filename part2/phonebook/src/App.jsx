import {StrictMode, useEffect, useState} from 'react'
import Names from './components/Names.jsx'
import Name from './components/Name.jsx'
import PersonsForm from "./components/PersonsForm.jsx";
import Filter from "./components/Filter.jsx";
import phoneService from "./services/phonebook.js";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('Arto Hellas')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    useEffect(() => {
        phoneService.getPersons()
            .then(response => {
                return setPersons(response)
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
        if (!newName.trim()) {
            window.alert('Please enter a name')
            return
        }
        if (!newNumber.trim()) {
            window.alert('Please enter a number')
            return
        }
        const newPersonObject = {name: String(newName), number: String(newNumber)}

        const existingPerson = persons.find((person) => person.name === newPersonObject.name)

        if (existingPerson) {
            if (window.confirm(`${existingPerson.name} is already in phonebook. Do you want to replace the number from ${existingPerson.number} to ${newPersonObject.number}?`)) {
                phoneService.updatePerson(existingPerson.id, newPersonObject)
                    .then(updatedPerson => {
                        setPersons(prevPersons =>
                            prevPersons.map(person =>
                                person.id === existingPerson.id ? updatedPerson : person
                            )
                        )
                        setNewName('')
                        setNewNumber('')
                    })
            }

            return
        }


        phoneService.addPerson(newPersonObject)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setFilter('')
            })


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
    const toggleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            phoneService.deletePerson(id).then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
        }

    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} filter={filter}/>
            <PersonsForm handleSubmit={addPerson} handleNameChange={handleNameChange}
                         handleNumberChange={handleNumberChange} name={newName}
                         number={newNumber}/>
            <h2>Numbers</h2>
            {personsToShow.map((person) => {
                return (<Name key={person.name} person={person} toggleDelete={() => toggleDelete(person.id)}/>)

            })}


        </div>

    )
}

export default App