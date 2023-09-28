import React from 'react'; 
import './todoSearch.css'

function TodoSearch({searchValue, setSearchValue}){

    // Declaramos el estado [nombre del estado, actualizador del estado]
    // ver en App.js

    // Por que nuestro estado va a ser un value?
    // porque corresponde al valor de nuestro input
return(
    <input
        placeholder='cortar cebolla'
        className='TodoSearch'
        value={searchValue}
        onChange={(event) => {
            setSearchValue(event.target.value)
        }}
    />
    )
}

export { TodoSearch }