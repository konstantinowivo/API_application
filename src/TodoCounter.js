import './todoCounter.css'

function TodoCounter({total, completed}){
return(
    <h1 className='TodoCounter'>
        Ya completaste {completed} de {total} todos.
    </h1>
)
}

export { TodoCounter }