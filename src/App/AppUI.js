import { TodoItem } from '../TodoItem';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import {CreateTodoButton} from '../CreateTodoButton';
import { EmptyTodos } from '../EmptyTodos';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';

function AppUI({
    completedTodos,
    totalTodos,
    searchValue,
    searchedTodos,
    setSearchValue,
    completeTodo,
    deleteTodo,
    loading,
    error
})
{
    return(
    <>
    <TodoCounter 
    completed={completedTodos} 
    total={totalTodos}/>
    
    <TodoSearch
    searchValue={searchValue}
    setSearchValue={setSearchValue}/>

    <TodoList>
        {loading && <TodosLoading/>}
        {error && <TodosError/>}
        {(!loading && searchedTodos.length === 0)
        && <EmptyTodos/>}

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