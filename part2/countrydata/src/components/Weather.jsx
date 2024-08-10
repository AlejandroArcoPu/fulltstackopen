import {useState, useEffect} from 'react'
import weatherService from '../services/weather'

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
      weatherService
      .getWeather(country.latlng[0],country.latlng[1])
      .then(initialWeather => {
        setWeather(initialWeather)
      })
    }, [country.latlng])
  
    if(!weather) { // if not the first render fails
      return
    }
    
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <img alt={`Weather icon ${weather.weather[0].icon}`} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
}

export default Weather