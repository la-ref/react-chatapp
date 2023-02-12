import React from 'react'
import {Link} from "react-router-dom"

export default function FormContainer() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        e.preventDefault();
    }

      

  return (
    <>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Chat</h1>
            <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)}></input>
            <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)}></input>
            <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}></input>
            <input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={(e) => handleChange(e)}></input>
            <button type="submit">Register</button>
            <p>Already have an account ? <Link to="/login" >Login</Link></p>
        </form>
    </>
  )
}
