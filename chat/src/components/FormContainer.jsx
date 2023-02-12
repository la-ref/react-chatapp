import {React} from 'react'
import {Link} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";

export default function FormContainer({className,info,setValue,submited}) {


    const handleSubmit = async (e) => {
        e.preventDefault();
        submited()
    }

    const handleChange = (e) => {
        setValue({[e.target.name]:e.target.value})
    }

  return (
    <div className={className}>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>{info.name}</h1>
            <input type="text" placeholder="Username" name="username" pattern="^[a-zA-Z0-9_.-]{3,16}$" onChange={(e) => handleChange(e)}></input>
            <input type="email" placeholder="Email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={(e) => handleChange(e)}></input>
            <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}></input>
            {info.name === "Register" && (
                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => handleChange(e)}></input>
            )}
            <button type="submit">{info.msg}</button>
            <p>Already have an account ? <Link to={info.redirect} >Login</Link></p>
        </form>
    </div>
  )
}
