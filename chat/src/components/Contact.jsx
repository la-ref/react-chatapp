import React,{useEffect, useState} from 'react'
import styled from "styled-components";

export default function Contact({contacts,currentUser}) {
    const [currentUserName,setCurrentUserName] = useState(undefined)
    const [currentUserImage,setCurrentUserImage] = useState(undefined)

    useEffect(() => {
        if (currentUser){
            setCurrentUserName(currentUser.username)
        }
    })
    return (
        <div>Contact</div>
    )
}