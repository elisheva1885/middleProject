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
import { red, green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import DialogTodo from './DialogTodo';
import DialogAddTodo from './DialogAddTodo';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FeedIcon from '@mui/icons-material/Feed';
import DialogPost from './DialogPost';
import DialogAddPost from './DialogAddPost';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



const Post = (props) => {

    const deletePost = async (_id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/post`, { data: { _id: _id } })
            if (res.status === 200) {
                props.sortData(res.data)
                props.setPosts(res.data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    return (<>
        <br />
        <DialogAddPost setPosts={props.setPosts} sortData={props.sortData}/>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
            {props.posts.map((p) => {

                return (

                    <ListItem key = {p._id} >
                        <ListItemAvatar>
                            <Avatar>
                                <FeedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', paddingRight: 1 }}>

                        <ListItemText 
                        primary={p.title} 
                        secondary={<Typography variant="body2" noWrap={false}>{p.body}</Typography>} 
                    />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <DialogPost p={p} setPosts={props.setPosts} sortData={props.sortData}/>
                        <button style={{"border-width": "0", "backgroundColor": "lightblue"} } onClick={() => { deletePost(p._id) }}><DeleteIcon /></button>
                        </Box>

                    </ListItem>)
            })}
        </List>

    </>

    );


}

export default Post



