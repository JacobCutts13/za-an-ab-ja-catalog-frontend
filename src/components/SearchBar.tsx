import { useState, useEffect } from "react"


export default function SearchBar ():JSX.Element{
    const [search, setSearch] = useState <string>("")
    const [selector, setSelector] = useState <string>("")
    


console.log(selector)
    return(
        <>
        <input onChange={((e) => setSearch(e.target.value))}></input>
        <select onChange={((e) => setSelector(e.target.value))} value={selector}>
            <option>All</option>
            <option>author</option>
            <option>title</option> 
        </select>
        </>
    )
}