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


const DialogTodo = (props) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const updateTodo = async(formJson,t,setTodos) => {
        console.log(formJson);
        const newTodo = {
          _id : t._id,
          title: formJson.title ||  t.title,
          tags: formJson.tags || t.tags,
          completed: t.completed
        }
        const res = await axios.put(`http://localhost:8000/api/todo`, newTodo)
        if(res.status === 200){
          props.sortData(res.data)
          setTodos(res.data)
      }
        return(
            <>
            </>   
        )
        
    }
    return(
        <Fragment>
        <Button variant="outlined" onClick={handleClickOpen} style={{"border-width": "0"} }>
        <ModeIcon/>
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
               updateTodo(formJson,props.t, props.setTodos)

              handleClose();
            },
          }}
        >
          <DialogTitle>UpdateTodo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new fileds
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="title"
              label={"title: " +props.t.title}
              type="string"
              fullWidth
              variant="standard"

            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="tags"
              label={"tags: "+props.t.tags}
              type="[string]"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
          {/* ()=>{ onSubmit(props.t, props.setTodos) */}
            <Button type = "submit" variant='contained'>update</Button>
            <Button onClick={handleClose}>cancel</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )

}
export default DialogTodo