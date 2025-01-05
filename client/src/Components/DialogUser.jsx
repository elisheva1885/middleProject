import { useState, Fragment, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModeIcon from '@mui/icons-material/Mode';
import axios from 'axios'
import { Email } from '@mui/icons-material';


const DialogUser = (props) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateUser = async (formJson, u, setUsers) => {
        console.log(formJson);
        const newUser = {
            _id: u._id,
            name: formJson.name || u.name,
            username: u.username,
            email: formJson.email || u.email,
            address: formJson.address || u.address,
            phone: formJson.phone || u.phone
        }
        try {
            const res = await axios.put(`http://localhost:8000/api/user`, newUser)
            if (res.status === 200) {
                setUsers(res.data)
            }
        }
        catch (e) {
            console.error(e)
        }


    }
    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen} style={{"border-width": "0"} }>
                <ModeIcon />
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
                        updateUser(formJson, props.u, props.setUsers)
                        handleClose();
                    },
                }}
            >
                <DialogTitle>UpdateUser</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new fileds
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label={"name: " + props.u.name}
                        type="string"
                        fullWidth
                        variant="standard"

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label={"email: " +props.u.email}
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        name="address"
                        label={"address: "+props.u.address}
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        name="phone"
                        label={"phone: "+props.u.phone}
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    {/* ()=>{ onSubmit(props.t, props.setTodos) */}
                    <Button type="submit" variant='contained'>update</Button>
                    <Button onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )

}
export default DialogUser