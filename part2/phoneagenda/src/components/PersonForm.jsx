const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
            name: <input value={props.newName} onChange={props.onChangeName}/>
            </div>
            <div>
            number: <input value={props.newNumber} onChange={props.onChangeNumber}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm