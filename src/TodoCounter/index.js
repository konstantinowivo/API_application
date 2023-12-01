import React from 'react';
import { TodoContext } from '../TodoContext';
import Font from 'react-font'
import './TodoCounter.css';

function TodoCounter() {
    const {
        completedTodos,
        totalTodos,
    } = React.useContext(TodoContext);
    
    return (
            <Font family='Roboto'>
                <h1 className="TodoCounter">
                    Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> tareas
                </h1>
            </Font>
    );
}

export { TodoCounter };