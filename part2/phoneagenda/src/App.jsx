import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(person =>{
        setPersons(person)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newNumber
    }
    if(persons.some(person => person.name === personObject.name && person.number === personObject.number)){
      alert(`${newName} is already added to phonebook`) 
    } else if (persons.some(person => person.name === personObject.name && person.number !== personObject.number)) {
      if(confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
        const personFind = persons.find(person => person.name === personObject.name)
        const updatePerson = {...personFind, number: newNumber}
        personService
          .update(updatePerson.id,updatePerson)
          .then(initialPerson => {
            setPersons(persons.map(person => person.id !== updatePerson.id ? person : initialPerson ))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleOnChangeName = (event) => setNewName(event.target.value)
  
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value)

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(person => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

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
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
