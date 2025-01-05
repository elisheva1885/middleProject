import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import Post from "./Post"
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/joy/Input';
import FeedIcon from '@mui/icons-material/Feed';
import { red,green ,yellow} from '@mui/material/colors';

import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';



const Posts = () => {
    const [posts, setPosts] = useState([])
    const [posts2, setPosts2] = useState(posts)

    const searchTitle = useRef(null)


    const getPosts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/post')
            // const sortedData = res.data.sort((a, b) => {
            //     if (a.title < b.title) return -1;  // a comes before b
            //     if (a.title > b.title) return 1;   // a comes after b
            //     return 0;                           // a and b are equal
            // });
            // const sortedData = res.data.sort((a, b) => a.title > b.title?a:b);
            if (res.status === 200) {
                setPosts(res.data)
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    const getPostByTitle = async () => {
        try {
            const title = searchTitle.current.value
            const result = await axios.get(`http://localhost:8000/api/post/${title}`)
            console.log(title)
            if (result.status === 200) {
                setPosts2(posts)
                setPosts(result.data)
            }
        }
        catch (e) {
            console.error(e)
        }
        searchTitle.current.value = ""
    }
    const printPosts = () => {

        if (posts2.length !== 0) {
            setPosts(posts2)

        }
        else {
            setPosts(posts)
        }
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <>
        <Button variant="outlined" onClick={printPosts} style={{"border-width": "0"} }>
        <Fab size="large" style =  {{"backgroundColor": yellow[300]}} aria-label="add">
        <FeedIcon />
      </Fab>
        </Button>

            <Input slotProps={{ input: { ref: searchTitle } }} placeholder="Search by title...." color="primary"  variant="outlined"  endDecorator={<button onClick={getPostByTitle} style={{"border-width": "0"} } > <SearchIcon /> </button>} ></Input>

            <br />

            {<Post posts={posts} setPosts={setPosts} />}




        </>
    )
}
export default Posts