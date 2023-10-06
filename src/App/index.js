import React from 'react';
import { AppUI } from './AppUI';
import { useLocalStorage } from './useLocalStorage';

// const defaultTodos = [
//   { text: 'LALALA', completed: true},
//   { text: 'Jugar pelota', completed: true},
//   { text: 'Darle de comer a roma', completed: false},
//   { text: 'cambiarle el pañal a León', completed: false},
//   { text: 'jugar cod', completed: true}
// ]

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos))

// localStorage.removeItem('TODOS_V1', defaultTodos)


export default function App() {

  const {
    item: todos, 
    saveItems: saveTodos,
    loading,
    error } = useLocalStorage('TODOS_V1', [])
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length // !! va a devolver un boolean
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  )


  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }

return(
  <AppUI 
  loading = {loading}
  error = {error}
  completedTodos={completedTodos}
  totalTodos={totalTodos}
  searchValue={searchValue}
  searchedTodos={searchedTodos}
  setSearchValue={setSearchValue}
  completeTodo={completeTodo}
  deleteTodo={deleteTodo}  />
)
}
