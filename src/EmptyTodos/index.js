import React from "react"
import {Grid} from '@material-ui/core'
import { IoFileTray } from "react-icons/io5";
import './EmptyTodos.css';


function EmptyTodos(){
    return(
    <div>
        <Grid container justifyContent="center" direction="column" alignItems="center">
            <IoFileTray className="IoFileTray" size={100}/>
            <p className="EmptyTodos">
                Lista de tareas vacía
            </p>
        </Grid>

    </div>
)
}

export { EmptyTodos }