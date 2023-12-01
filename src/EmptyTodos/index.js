import React from "react"
import {Grid} from '@material-ui/core'
import { IoFileTray } from "react-icons/io5";
import './EmptyTodos.css';


function EmptyTodos(){
    return(
    <div>
        <Grid container justifyContent="center" direction="column" alignItems="center">
            <IoFileTray size={150} />
            <p>No hay todos en la lista</p>
        </Grid>

    </div>
)
}

export { EmptyTodos }