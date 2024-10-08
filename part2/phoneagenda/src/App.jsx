import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [styleType, setStyleType] = useState('')

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
            setStyleType('success')
            setMessage(`Updated ${initialPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error =>{
            setStyleType('error')
            setMessage(`Information of ${updatePerson.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setStyleType('success')
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setStyleType('error')
          setMessage(`${error.response.data.error}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
    }
  }

  const handleOnChangeName = (event) => setNewName(event.target.value)
  
  const handleOnChangeNumber = (event) => setNewNumber(event.target.value)

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then( () => {
          setPersons(persons.filter(p => p.id !== person.id))
          setStyleType('success')
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setStyleType('error')
          setMessage(`${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const personsToShow = newFilter.length !== 0 
  ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} styleType={styleType}/>
      <Filter filter={newFilter} onChange={(event) => setNewFilter(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} onChangeName={handleOnChangeName} onChangeNumber={handleOnChangeNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
