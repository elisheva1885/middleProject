import {useState,Fragment, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModeIcon from '@mui/icons-material/Mode';
import axios from 'axios'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';


const DialogAddTodo = (props) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      
    const createTodo =async (formJson,setTodos) => {
        try{
        const newTodo = {
            title : formJson.title,
            tags : formJson.tags 
        }
        const res = await axios.post('http://localhost:8000/api/todo', newTodo)
        if(res.status === 200)
            {
            setTodos(res.data)
            console.log(res.data)
            }
            
    }
    catch(e){
        console.error(e)
    }  

    }

    return(
        <Fragment>
        <Button variant="outlined" onClick={handleClickOpen} style={{
        position: 'fixed',
        bottom: 0, // Align to the bottom
        right: 0,  // Align to the right
        borderWidth: 0,
        padding: 0, // Optional to remove extra padding
      }}>
        <Fab size="large" color="primary" aria-label="add">
        <AddTaskIcon />
      </Fab>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              
               event.preventDefault();
               const formData = new FormData(event.currentTarget);
               const formJson = Object.fromEntries(formData.entries());
               const title = formJson.title;
               console.log(title);
               const tags = formJson.tags;
               console.log(tags);
               createTodo(formJson, props.setTodos)

              handleClose();
            },
          }}
        >
          <DialogTitle>createTodo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new todo
            </DialogContentText>
            <TextField
            
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              label="title"
              type="string"
              fullWidth
              variant="standard"

            />
            <TextField
            
              autoFocus
              margin="dense"
              id="name"
              name="tags"
              label="tags"
              type="[string]"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
          {/* ()=>{ onSubmit(props.t, props.setTodos) */}
            <Button type = "submit" variant='contained'>create</Button>
            <Button onClick={handleClose}>cancel</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )

}
export default DialogAddTodo