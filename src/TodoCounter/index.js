import React from 'react';
import { TodoContext } from '../TodoContext';
import Font, { Text } from 'react-font'
import './TodoCounter.css';

function TodoCounter() {
    const {
        completedTodos,
        totalTodos,
    } = React.useContext(TodoContext);
    
    return (
            <Font family='Roboto' weight={700}>
                <h1 className="TodoCounter">
                    Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> TODOs
                </h1>
            </Font>
    );
}

export { TodoCounter };