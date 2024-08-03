import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
        .get("http://localhost:3001/persons")
        .then(response => 
          setPersons(response.data)
        )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    persons.some(person => person.name === personObject.name.trim()) 
    ? alert(`${newName} is already added to phonebook`) 
    : setPersons(persons.concat(personObject))
    
    setNewName('')
    setNewNumber('')
  }

  const handleOnChangeName = (event) => setNewName(event.target.value)
  
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value)

  const personsToShow = newFilter.length !== 0 
  ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChange={(event) => setNewFilter(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} onChangeName={handleOnChangeName} onChangeNumber={handleOnChangeNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
