import CountryInfo from "./CountryInfo.jsx";

const Countries = ({props, handleClick}) => {
    // console.log(props)

    if (props.length === 1) {
        const country = props[0]
        return (<CountryInfo country={country}/>)
    } else if (props.length <= 10)
        return (<ul>{props.map(c => {
            return (<li key={c.name.common}>{c.name.common}
                <button onClick={handleClick} value={c.name.common}>show info</button>
            </li>)
        })}</ul>)
    else
        return (<p>too many matches, specify another filter</p>)

}
export default Countries