import * as React from 'react';
import { useEffect,useRef, useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from 'axios'
import { red,green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import  DialogTodo  from './DialogTodo';
import  DialogAddTodo  from './DialogAddTodo';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';




const Todo = (props) => {
   

    const completeTodo = async(t) => {
        let comp = true
        if(t.completed)
            {
                comp = false
            }
        const todo = {
            ...t,
            completed  : comp,
  
        }
        const res = await axios.put(`http://localhost:8000/api/todo`,todo)
        props.setTodos(res.data)
        console.log(props.todos);
    }
    const deleteTodo = async(_id) => {
        try{
            const res = await axios.delete(`http://localhost:8000/api/todo`, {data : { _id: _id}})
            if(res.status === 200){
                props.setTodos(res.data)
            }
        }
        catch(error){
            console.error(error)
        }
    }   
    return( <>
    <br/>
     <DialogAddTodo setTodos = {props.setTodos}/>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
            {props.todos.map((t) => {
     
                return (
                    
                    <ListItem key = {t._id}>
                        <ListItemAvatar>
                            <Avatar>
                                <TaskIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', paddingRight: 1 }}>

                        <ListItemText primary={t.title} secondary={t.tags} />
                        </Box>
                       <button style =  {{"backgroundColor": t.completed?green[300]:red[500],"border-width": "0"} } onClick={()=>{completeTodo(t)}} > <DoneOutlineIcon /> </button>
                       <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <DialogTodo t = {t} setTodos = {props.setTodos}/>
                        <button onClick={()=>{deleteTodo(t._id)}} style={{"border-width": "0", "backgroundColor": "lightblue"} }><DeleteIcon /></button>
                        </Box>

                    </ListItem>)
            })}
        </List>
         
          </>

    );


}

export default Todo



