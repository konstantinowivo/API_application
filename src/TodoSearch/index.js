    import React from 'react';
    import { TodoContext } from '../TodoContext';
    import { FaMagnifyingGlass } from "react-icons/fa6";
    import Font from 'react-font'
    import './TodoSearch.css';

    function TodoSearch() {
    const {
        searchValue,
        setSearchValue,
    } = React.useContext(TodoContext);
    
return (
    <div>
        <Font family='Roboto'>
        <input
            placeholder="Buscador de tareas"
            className="TodoSearch"
            value={searchValue}
            onChange={(event) => {
            setSearchValue(event.target.value);
        }}
        />
        </Font>
        <FaMagnifyingGlass className='FaMagnifyingGlass'/>
    </div>
);
}

export { TodoSearch };