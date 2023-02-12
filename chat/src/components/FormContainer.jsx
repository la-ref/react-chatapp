import {React,useState} from 'react'
import {Link} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function FormContainer({className}) {

    const [value,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidation()
    }

    const handleChange = (e) => {
        setValues({...value,[e.target.name]:e.target.value})
        console.log(value)
    }

    const handleValidation = () => {
        const {username,email,password,confirmPassword} = value
        if(password !== confirmPassword){
            toast.error("Password and confirm password should be the same.",{
                position:"top-right",
                autoClose:8000,
                pauseOnHover:true,
                theme: "dark",
                draggable: false,
                className: {
                    background: "white !important"
                }
            })
        }
    }
      

  return (
    <div className={className}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Register</h1>
            <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)}></input>
            <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)}></input>
            <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}></input>
            <input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={(e) => handleChange(e)}></input>
            <button type="submit">create account</button>
            <p>Already have an account ? <Link to="/login" >Login</Link></p>
        </form>
        <ToastContainer />
    </div>
  )
}
