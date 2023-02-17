import React, { useState } from 'react'
import styled from 'styled-components';
import { Navigate } from "react-router-dom";
import {toast} from "react-toastify"
import {BiPowerOff} from "react-icons/bi";

export default function Logout() {

    const [logout,setLogout] = useState(false)

    const handleClick = async () => {
        localStorage.clear()
        toast.success("Successfully logged out",toastOption)
        setLogout(true)
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
    
    return (
        <Button onClick={handleClick}>
            {logout && <Navigate to="/setavatar" replace={true}></Navigate>}
            <BiPowerOff>
            </BiPowerOff>
            Logout
        </Button>
    )
}

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9055a2;
    gap: 4px;
    cursor: pointer;
    color:white;

    &:hover{
        color: #9055a2;
        background-color: white;
    }
    
`;