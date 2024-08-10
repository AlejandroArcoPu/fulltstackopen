import Country from '../components/Country'

const Countries = ({countries,filter,setNewFilter}) => {
    if(filter) { // if you put this you are having issues with countries.length because the first state is null
      if (countries.length > 10 ) return <p>Too many matches, specify another filter</p>
      if (countries.length === 1) return <Country country={countries[0]}/>
      if (countries.length === 0) return <p>Country not existing, please change your filter</p>
  
      return (
        <div>
          <ul>
            {countries.map((country) =>
              <li key={country.name}>
                {country.name}
                <button onClick={() => setNewFilter(country.name)}>show</button>
              </li>
            )}
          </ul>
        </div>
      )
    }
}

export default Countries