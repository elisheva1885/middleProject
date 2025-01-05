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
import PostAddIcon from '@mui/icons-material/PostAdd';


const DialogAddPost = (props) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      
    const createPost =async (formJson,setPosts) => {
        try{
        const newPost = {
            title : formJson.title,
            body : formJson.body
        }
        const res = await axios.post('http://localhost:8000/api/post', newPost)
        if(res.status === 200)
            {
            setPosts(res.data)
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
      }} >
        <Fab size="large" color="primary" aria-label="add">
        <PostAddIcon />
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
               createPost(formJson, props.setPosts)

              handleClose();
            },
          }}
        >
          <DialogTitle>createPost</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new post
            </DialogContentText>
            <TextField
            
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="title"
              type="string"
              fullWidth
              variant="standard"

            />
            <TextField
            
              autoFocus
              margin="dense"
              id="body"
              name="body"
              label="body"
              type="string"
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
export default DialogAddPost