import React from 'react';
import { TodoItem } from './TodoItem';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import {CreateTodoButton} from './CreateTodoButton';

// const defaultTodos = [
//   { text: 'LALALA', completed: true},
//   { text: 'Jugar pelota', completed: true},
//   { text: 'Darle de comer a roma', completed: false},
//   { text: 'cambiarle el pañal a León', completed: false},
//   { text: 'jugar cod', completed: true}
// ]

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos))

// localStorage.removeItem('TODOS_V1', defaultTodos)

function useLocalStorage(itemNAme, initialValue){

  let localStorageItem = localStorage.getItem(itemNAme)
  let parsedItem;

  if(!localStorageItem) {
    localStorage.setItem(itemNAme, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem) ;
  }

  const [item, setItem] = React.useState(parsedItem);
  
  const saveItem = (newItem) => {
    localStorage.setItem(itemNAme, JSON.stringify(newItem));
    setItem(newItem)
  }

  return [item, saveItem]
}

function App() {
  // Estos son estados en componente padre (estados de data original)
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', [])
  const [searchValue, setSearchValue] = React.useState('');

  // Estos son estados derivados(a partir del estado original, realizar un filtrado o cálculo ó lo que necesitemos)
  // para poder actulizar los estados originales lo hacemos mediante una arrow function u otra propiedad.. ej length.
  // (propiedad de una función objeto)
  const completedTodos = todos.filter(todo => !!todo.completed).length // !! va a devolver un boolean
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  )


  // Creamos la función que va a actualizar el estado de nuestros todos
  // en este caso, si se encuentran completed: true or false.

  const completeTodo = (text) => {
    // mediante el operador "..." creamos una copia del array "todos" y lo alojamos en la variable newTodos.
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      // eslint-disable-next-line eqeqeq
      (todo) => todo.text == text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    // eslint-disable-next-line eqeqeq
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }

return(
  <>
  <TodoCounter completed={completedTodos} total={totalTodos}/>
  <TodoSearch
  searchValue={searchValue}
  setSearchValue={setSearchValue}/>


  {/* COMUNICACION ENTRE COMPONENTES MEDIANTE PROPS: */}

  <TodoList>
    {/* Vamos a renderizar nuestro array y generar
    un array nuevo gracias al método .map, de manipulación
    de array, que nos va a devolver un nuevo array */}

    {/* Usamos arrow function y nos ahorramos el return.. 
    y para poder renderizar cualquiera de estos 3 estados:
    1) Nuestra lista de todos original [todos, setTodos] sin modificar
    2) La primera actualización del estado de la lista original con la constante "completedTodos"
    3) La lista actualizada + un patrón de búsqueda orginado por alguna coincidencia con lo que escribamos en el input.
    Para eso vamos a utilizar la actulización de estado searchedTodos que no es más que el estado todos original con con
    métodos cómo .filter aplicados al estado original de serchValue (input) que nos devolverá un resultado similar a la búsqueda,
    a ese resultado lo renderizamos aplicando un mapeo del resultado*/}
  {searchedTodos.map(todo => (

    // Por cada unidad de nuestro array debemos especificar
    // una propiedad "key", para que react pueda renderizar
    // cada elemento, en este caso vamos a usar la propiedad "text"
    <TodoItem 
    key={todo.text}
    text={todo.text}
    completed={todo.completed}
    // Insertamos un actualizador del estado por medio de un arrow function (completeTodo) alojada en la propiedad onComplete (en TodoItem.js figura mediante evento onClick).
    // lo que va a hacer esto es: Actualizar el estado individual (si se encuentra completo o no), por cada elemento de un nuevo array que vamos a generar en la función y luego los renderizamos,
    // esto evita que tengamos que modificar el "estado global" de nuestro array original "defaultTodos".
    // Una vez generado dicho array (newTodos) se lo aplicamos cómo parámetro a nuestro actualizador de estado "setTodos"
    onComplete={() => completeTodo(todo.text)} //<-- (ver porqué enviamos una propiedad por medio de una arrow function...)
    onDelete={() => deleteTodo(todo.text)}
    />
  ))}
  </TodoList>

  <CreateTodoButton/>
  </>
);

}

export default App;