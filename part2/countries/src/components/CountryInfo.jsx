import axios from "axios";
import {useEffect, useState} from "react";

const CountryInfo = (country) => {
    const [weatherData, setWeatherData] = useState(null);
    const api_key = import.meta.env.VITE_SOME_KEY
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.country.capitalInfo.latlng[0]}&lon=${country.country.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`
    useEffect(() => {
        axios.get(weatherUrl).then(res => setWeatherData(res.data))
    }, [])

    console.log(weatherData)
    return (<div>
        <h1>{country.country.name.common}</h1>
        <p>Capital: {country.country.capital}</p>
        <p>Area: {country.country.area}</p>
        <h2>Languages</h2>
        <ul>{Object.entries(country.country.languages).map(([key, lang]) => <li key={key}>{lang}</li>)}</ul>
        <img src={country.country.flags.png} alt={`${country.country.name.common} flag`}/>
        <h2>Weather in {country.country.capital}</h2>
        <p>Temperature is {weatherData ? weatherData.main.temp : null} Celsius</p>
        <img
            src={`https://openweathermap.org/payload/api/media/file/${weatherData ? weatherData.weather[0].icon : null}.png`}/>
        <p>Wind is {weatherData ? weatherData.wind.speed : null}</p>
    </div>)
}
export default CountryInfo