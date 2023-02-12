import {BrowserRouter,Routes,Route} from "react-router-dom"
import {React,useState} from 'react'
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login"
import {ToastContainer} from "react-toastify"
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Chat/>}></Route>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
  );
}

export default App;
