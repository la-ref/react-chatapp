import {React,useState} from 'react'
import {Link} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

export default function FormContainer({className}) {

    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            //const {username,email,password,confirmPassword} = values;
            console.log(values)
            const {data} = await axios.post(registerRoute,values)
            if(data.status === false){
                toast.error(data.msg,toastOption)
            }
            else if(data.status === true){
                toast.success("Succesfuly registered!",toastOption)
            }
        }
    }

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
        console.log(values)
    }

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
        if(password !== confirmPassword){
            toast.error("Password and confirm password should be the same",toastOption)
        } else if (username.length <3) {
            toast.error("Username should be greater than 3 characters",toastOption)
        }
        else if (username.length >15) {
            toast.error("Username should be lower than 16 characters",toastOption)
        }
        else if (password.length < 8) {
            toast.error("Password should be equal greater than 8 characters",toastOption)
        }
        else if (password.length >31) {
            toast.error("Password should be lower than 32 characters",toastOption)
        }
        else if (email === ""){
            toast.error("Email is required",toastOption)
        }
        else{
            return true
        }
    }
      

  return (
    <div className={className}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Register</h1>
            <input type="text" placeholder="Username" name="username" pattern="^[a-zA-Z0-9_.-]{3,16}$" onChange={(e) => handleChange(e)}></input>
            <input type="email" placeholder="Email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={(e) => handleChange(e)}></input>
            <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}></input>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => handleChange(e)}></input>
            <button type="submit">create account</button>
            <p>Already have an account ? <Link to="/login" >Login</Link></p>
        </form>
        <ToastContainer />
    </div>
  )
}
