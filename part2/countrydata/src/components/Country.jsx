import Languages from '../components/Language'
import Weather from '../components/Weather'

const Country = ({country}) => {
    return(
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <Languages languages={country.languages}/>
        <img src={country.flag} width={150}/>
        <Weather country={country}/>
      </div>
    )
}

export default Country