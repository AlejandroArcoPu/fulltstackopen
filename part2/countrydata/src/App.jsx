import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'

function App() {
  
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountry => {
        setCountries(initialCountry)
      }
      )
  }, [])

  if(!countries) return

  const countriesToShow = newFilter
  ? countries.filter(country => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    .map(country => 
      ({
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags.svg,
        latlng: country.capitalInfo.latlng || country.latlng // case of United States Minor Outlying Islands no capital
      })
    )
  : null

  return (
      <div>
        <h2>Countries Data</h2>
        find countries <input value={newFilter} onChange={(event) => setNewFilter(event.target.value)} placeholder='Find countries'/>
        <Countries countries={countriesToShow} filter={newFilter} setNewFilter={setNewFilter}/>
    </div>
  )
}

export default App
