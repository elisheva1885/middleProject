import { useEffect,useRef, useState } from "react"
import axios from 'axios'
import User from "./User"
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';

import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import { red,green ,yellow} from '@mui/material/colors';


const Users = () => {
    const [users, setUsers] = useState([])
    const [users2, setUsers2] = useState(users)

    const searchName = useRef(null)

    const sortData = (data) => {
        data.sort((a, b) => {
            if (a.name < b.name) return -1;  // a comes before b
            if (a.name > b.name) return 1;   // a comes after b
            return 0;                           // a and b are equal
        })
    }
    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/user')
            if (res.status === 200) {
                sortData(res.data)
                setUsers(res.data)
                console.log(res.data)
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    const getUserByName = async () => {
        try {
            const name = searchName.current.value
            console.log(name)
            const result = await axios.get(`http://localhost:8000/api/user/${name}`)
            if (result.status === 200) {
                setUsers2(users)
                setUsers(result.data)
            }
        }
        catch (e) {
            console.error(e)
        }
         searchName.current.value = ""
    }
    const printUsers = () => {
 
        if(users2.length!==0){
            setUsers(users2)

        }
        else{
            setUsers(users)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
 <Button variant="outlined" onClick={printUsers} style={{"border-width": "0"} }    >
        <Fab size="large" style =  {{"backgroundColor": yellow[300]}} aria-label="add">
        <PeopleIcon />
      </Fab>
        </Button>
            <br />
            <Input slotProps={{ input: { ref: searchName } }} placeholder="Serch by name...." variant="outlined" color="primary"   endDecorator={<button  onClick={getUserByName} style={{"border-width": "0"}} > <SearchIcon /> </button>} ></Input>

            {<User users={users} setUsers={setUsers} sortData = {sortData}/>}
        </>
    )
}
export default Users