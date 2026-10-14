const PersonsForm = ({
                         handleSubmit, name, number, handleNameChange, handleNumberChange
                     }) => {
    return (<form onSubmit={handleSubmit}>
        <div>
            name:{' '}
            <input
                value={name}
                onChange={handleNameChange}
            />

            number:{' '}
            <input
                value={number}
                onChange={handleNumberChange}
            />
        </div>

        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonsForm