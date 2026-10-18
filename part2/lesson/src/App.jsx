import {useEffect, useState} from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note ...')
    const [showAll, setShowAll] = useState(true)
    const notesToShow = showAll ? notes : notes.filter(note => note.important)
    useEffect(() => {
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])
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
                console.log(error)
                alert(`the note '${note.content}' was already deleted from server`)
                setNotes(notes.filter(note => note.id !== id))
            })

    }
    return (<div>
        <h1>Notes</h1>
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
    </div>)
}

export default App