import { TodoItem } from '../TodoItem';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import {CreateTodoButton} from '../CreateTodoButton';

function AppUI({
    completedTodos,
    totalTodos,
    searchValue,
    searchedTodos,
    setSearchValue,
    completeTodo,
    deleteTodo,
})
{
    return(
    <>
    <TodoCounter completed={completedTodos} total={totalTodos}/>
    
    <TodoSearch
    searchValue={searchValue}
    setSearchValue={setSearchValue}/>

    <TodoList>
    {searchedTodos.map(todo => (
    <TodoItem 
    key={todo.text}
    text={todo.text}
    completed={todo.completed}
    onComplete={() => completeTodo(todo.text)} 
    onDelete={() => deleteTodo(todo.text)}
/>
    ))}
    </TodoList>  
    <CreateTodoButton/>
    </>
);
}

export {AppUI};