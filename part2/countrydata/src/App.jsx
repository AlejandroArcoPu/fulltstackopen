import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({languages}) => {
  const languagesValues = Object.values(languages)
  return (
    <div> 
      <b>languages</b>
      <ul>
        {
          languagesValues.map((language,i) =>
            <li key={i}>{language}</li>
          )
        }
      </ul>
    </div>
  )
}

const Country = ({country}) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <Languages languages={country.languages}/>
      <img src={country.flag} width={150}/>
    </div>
  )
}

const Countries = ({countries, filter,showCountry}) => {
  if(filter.length === 0) {
    return (
      <p>Put a filter to start!</p>
    )
  } 
  else if (countries.length > 10 ) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  } else if (countries.length === 0) {
    return (
      <p>This country is not existing! Change your filter.</p>
    )
  }
  return (
    <div>
      <ul>
        {countries.map((country,i) =>
          <li key={i}>
            {country.name}
            <button onClick={() => showCountry(country.name)}>show</button>
          </li>
        )}
      </ul>
    </div>
  )
}

function App() {
  
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all', {
      })
      .then(response => {
        setCountries(response.data)
      }
      )
  }, [])

  const handleChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showCountry = (name) => {
    setNewFilter(name)
  }

  const countriesToShow = newFilter.length !== 0 
  ? countries.filter(country => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    .map(country => 
      ({
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags.svg
      })
    )
  : null

  if(!countries){
    return null
  }

  return (
      <div>
        <h2>Countries Data</h2>
        find countries <input value={newFilter} onChange={handleChange}/>
        <Countries countries={countriesToShow} filter={newFilter} showCountry={showCountry}/>
    </div>
  )
}

export default App
