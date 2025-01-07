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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


const DialogAddUser = (props) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      
    const createUser =async (formJson,setUsers) => {
        try{
            const newUser = {
                name: formJson.name ,
                username: formJson.username,
                email: formJson.email,
                address: formJson.address,
                phone: formJson.phone
            }

        const res = await axios.post('http://localhost:8000/api/user', newUser)
        if(res.status === 200)
            {
            props.sortData(res.data)
            setUsers(res.data)
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
        
      
         <PersonAddAlt1Icon/>
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
               createUser(formJson, props.setUsers)

              handleClose();
            },
          }}
        >
          <DialogTitle>createUser</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new user
            </DialogContentText>
            <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="name"
                        type="string"
                        fullWidth
                        variant="standard"

                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="username"
                        name="username"
                        label="username"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="email"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        name="address"
                        label="address"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="phone"
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
export default DialogAddUser