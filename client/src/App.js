import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { BrowserRouter } from 'react-router-dom';
import Users from './Components/Users';
import Posts from './Components/Posts';
import Todos from './Components/Todos';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    {/* <h1>aaaaaaaaaa</h1> */}
   {/* <h1>bbbbbbbbbbbbbbb</h1> */}
   <Home/>
   {/* <Users/>
   <Posts/>
   <Todos/> */}
   </BrowserRouter>

    </div>
  );
}

export default App;
