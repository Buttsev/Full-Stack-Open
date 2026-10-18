import axios from 'axios'
import {useEffect, useState} from "react";
import Countries from "./components/Countries.jsx";

const App = () => {
    const [country, setCountry] = useState("sw")
    const [countriesToShow, setCountriesToShow] = useState([])

    useEffect(() => {
        let ignore = false

        axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then(response => {
                const countries = response.data.filter(item => country.trim() && item.name.common.toLowerCase()
                    .includes(country.trim().toLowerCase()))

                if (!ignore) {
                    setCountriesToShow(countries)
                }
            })

        return () => {
            ignore = true
        }
    }, [country])
    const handleChange = (event) => {
        setCountry(event.target.value)
    }
    const handleClick = (event) => {
        event.preventDefault()

        setCountry(event.target.value)
    }
    return (<div>
        <p>find country</p>
        <input value={country} onChange={handleChange}></input>
        <Countries props={countriesToShow} handleClick={handleClick}/>
    </div>)
}
export default App