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


const DialogPost = (props) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const updatePost = async(formJson,p,setPosts) => {
        console.log(formJson);
        const newPost = {
          _id : p._id,
          title: formJson.title ||  p.title,
          body: formJson.body || p.body
        }
        try{
        const res = await axios.put(`http://localhost:8000/api/post`, newPost)
        if(res.status === 200){
          setPosts(res.data)
      }
    }
    catch(e){
        console.error(e)
    }

        
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
               updatePost(formJson, props.p, props.setPosts)
              handleClose();
            },
          }}
        >
          <DialogTitle>UpdatePost</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new fileds
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="title"
              label={"title: " + props.p.title}
              type="string"
              fullWidth
              variant="standard"

            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="body"
              label={"body: " + props.p.body}
              type="string"
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
export default DialogPost