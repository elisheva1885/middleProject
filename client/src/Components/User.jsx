import * as React from 'react';
import { useEffect, useRef, useState } from "react"
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
import Typography from '@mui/material/Typography';
import DialogUser from './DialogUser';
import DialogAddPost from './DialogAddPost';
import DialogAddUser from './DialogAddUser';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';


const User = (props) => {

    const deletePost = async (_id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/user`, { data: { _id: _id } })
            if (res.status === 200) {
                props.sortData(res.data)
                props.setUsers(res.data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    return (<>
        <br />
        <DialogAddUser setUsers={props.setUsers} sortData = {props.sortData}/>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
            {props.users.map((u) => {

                return (

                    <ListItem key={u._id}  >
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        {console.log(u.username)}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', paddingRight: 1 }}>

                        <ListItemText primary={u.name} secondary={<>
                            <Typography variant="body2">{u.username}</Typography>
                            <Typography variant="body2">{u.email}</Typography>
                            <Typography variant="body2">{u.phone}</Typography>
                            <Typography variant="body2">{u.address}</Typography>
                        </>} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <DialogUser u={u} setUsers={props.setUsers} sortData = {props.sortData}/>
                        <button style={{ "border-width": "0", "backgroundColor": "lightblue" }} onClick={() => { deletePost(u._id) }}><DeleteIcon /></button>
                        </Box>
                    </ListItem>)
            })}
        </List>

    </>

    );


}

export default User



