import {React,useState} from 'react'
import {FormContainerStyled} from "../components/FormContainer.styles"
import { Navigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {

  const [registered,setRegistered] = useState(false)

  const [values,setValues] = useState({
      username:"",
      email:"",
      password:"",
      confirmPassword:""
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
    const {username,email,password,confirmPassword} = values
    if (username.length <3) {
        toast.error("Username should be greater than 3 characters",toastOption)
    }
    else if (username.length >15) {
        toast.error("Username should be lower than 16 characters",toastOption)
    }
    else if (email === ""){
        toast.error("Email is required",toastOption)
    }
    else if (password.length < 8) {
        toast.error("Password should be equal greater than 8 characters",toastOption)
    }
    else if (password.length >31) {
        toast.error("Password should be lower than 32 characters",toastOption)
    }
    else if(password !== confirmPassword){
        toast.error("Password and confirm password should be the same",toastOption)
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
        const {data} = await axios.post(registerRoute,values)
        console.log(data)
        if(data.status === false){
            toast.error(data.msg,toastOption)
        }
        else if(data.status === true){
            toast.success("Succesfuly registered!",toastOption)
            localStorage.setItem("rchat-app-user",JSON.stringify(data.user))
            setRegistered(true)
        }
    }
}

  return (
    <>
        {registered && (
          <Navigate to="/login" replace={true} />
        )}
      <FormContainerStyled info={{name:"Register",msg:"Create Account", redirect:"/login"}} setValue={handleChange} submited={handleSubmit}></FormContainerStyled>
    </>
  )
}
