import React from 'react'
import styled from "styled-components";

export default function Welcome({currentUser}) {
  return (
    <Container>
        <h1 className='hand'>👋</h1>
        <h1 className='msg'>Welcome,<span> {currentUser.username}</span></h1>
        <h3>Please select a chat to start messaging!</h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:white;
    .hand{
        font-size:5rem;
    }

    span {
        color:#9055a2;
    }

`;