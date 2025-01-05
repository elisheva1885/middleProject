import { useEffect,useRef, useState } from "react"
import axios from 'axios'
import Todo from "./Todo"
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import TaskIcon from '@mui/icons-material/Task';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import { red,green ,yellow} from '@mui/material/colors';


const Todos =()=> {
    const [todos , setTodos] = useState([])
    const [todos2 , setTodos2] = useState(todos)

    const searchTitle  = useRef(null) 

    const getTodos = async ()=>{
        try{
            const res = await axios.get('http://localhost:8000/api/todo')
            if(res.status === 200){
                setTodos(res.data)
                console.log(todos)
            }
            console.log(res.data)
        }
        catch(e){
            console.error(e)
        }
        console.log(todos)
    }


    
        const getTodoByTitle = async ()=> {
            try{
                const title = searchTitle.current.value
                const result = await axios.get(`http://localhost:8000/api/todo/${title}`)
                if(result.status === 200){
                    setTodos2(todos)
                    setTodos(result.data)
                }
        }
        catch(e){
            console.error(e)
        }
        searchTitle.current.value = ""

    }

    const printTodos = ()=>{
        if(todos2.length!==0){
            setTodos(todos2)

        }
        else{
            setTodos(todos)
        }
    }
    useEffect(()=>{
        getTodos()
    },[])
 
    return(
        <>      
        <Button variant="outlined" onClick={printTodos} style={{"border-width": "0"} }>
        <Fab size="large" style =  {{"backgroundColor": yellow[300]}} aria-label="add">
        <TaskIcon />
      </Fab>
        </Button>
        <Input slotProps={{ input: { ref: searchTitle } }} placeholder="Search by title....." variant="outlined" color="primary" endDecorator={<button onClick={getTodoByTitle} style={{"border-width": "0"}} > <SearchIcon /> </button>} ></Input>


        <br/>

        {<Todo todos={todos} setTodos = {setTodos}/>}

        </>
    )
}
export default Todos