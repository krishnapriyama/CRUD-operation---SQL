import Add from "./component/add"
import Home from "./component/home"
import Edit from "./component/edit"
import Profile from "./component/profile"
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter , Route , Routes } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <Routes>
<Route path={"/add"} element={<Add/>}></Route>
<Route path={"/edit/:id"} element={<Edit/>}></Route>
<Route path={"/profile/:id"} element={<Profile/>}></Route>
<Route path={"/"} element={<Home/>}></Route>
       
    </Routes>
    </BrowserRouter>
   
  )
}

export default App
