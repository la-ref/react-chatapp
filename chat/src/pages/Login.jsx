import {React,useEffect,useState} from 'react'
import {FormContainerStyled} from "../components/FormContainer.styles"
import { Navigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import { loginRoute } from '../utils/APIRoutes';

export default function Login() {

  const [logged,setLogged] = useState(false)

  const [values,setValues] = useState({
      username:"",
      email:"",
      password:"",
  })

  const toastOption = {
    position:"top-right",
    autoClose:8000,
    pauseOnHover:true,
    theme: "dark",
    draggable: false,
    className: {
        background: "white !important"
    }
  }

  const handleValidation = () => {
    const {username,password} = values
    if (username === "") {
        toast.error("Username or email is required",toastOption)
    }
    else if (password === "") {
        toast.error("Password is required",toastOption)
    }
    else{
        return true
    }
  }

  const handleChange = (value) => {
    setValues({...values,...value})
  }

  const handleSubmit = async () => {
    if (handleValidation()) {
        const {data} = await axios.post(loginRoute,values)
        if(data.status === false){
            toast.error(data.msg,toastOption)
        }
        else if(data.status === true){
            toast.success("Succesfuly logged!",toastOption)
            localStorage.setItem("rchat-app-user",JSON.stringify(data.user))
            setLogged(true)
        }
    }
}

  return (
    <>
        {(logged || localStorage.getItem("rchat-app-user")) && (
          <Navigate to="/Chat" replace={true} />
        )}
      <FormContainerStyled info={{name:"Login",msg:"Connect", redirect:"/Register"}} setValue={handleChange} submited={handleSubmit}></FormContainerStyled>
    </>
  )
}
