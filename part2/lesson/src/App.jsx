import {useEffect, useState} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('a new note ...')
    const [showAll, setShowAll] = useState(true)
    const notesToShow = showAll ? notes : notes.filter(note => note.important)
    const [errorMessage, setErrorMessage] = useState('some error happened')
    useEffect(() => {
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])
    if (!notes) {
        return null
    }
    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
    const addNote = (event) => {
        event.preventDefault()
        const newObject = {
            content: newNote, important: Math.random() > 0.5, id: String(notes.length + 1),
        }
        noteService.create(newObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })

    }
    const toggleImportance = (id) => {
        console.log('importance of note ' + id + ' needs to be toggled')
        const note = notes.find(note => note.id === id)
        const changedNote = {...note, important: !note.important}

        noteService.update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote : note))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })

    }
    return (<div>
        <h1>Notes</h1>
        <Notification message={errorMessage}/>
        <div>
            <button onClick={() => {
                setShowAll(!showAll)
            }}>show {showAll ? 'important' : 'all'}</button>
        </div>
        <ul>
            {notesToShow.map((note) => (
                <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>))}
        </ul>
        <form onSubmit={addNote}>
            <input value={newNote}
                   onChange={handleNoteChange}/>
            <button type="submit">Add Note</button>
        </form>
        <Footer/>
    </div>)
}

export default App