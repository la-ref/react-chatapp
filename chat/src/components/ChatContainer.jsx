import React from 'react'
import styled from "styled-components"
import ChatInput from './ChatInput';
import Logout from './Logout';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid'



export default function ChatContainer({currentChat, handleMsg,messages,scrollRef}) {

    const handleSendMsg = async (msg) => {
        handleMsg(msg)
    }
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout></Logout>
            </div>
            <div className="chat-messages">
                <Message scroll={scrollRef} messages={messages}></Message>
            </div>
            <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
        </Container>
  )
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap:0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width:1080px){
      grid-template-rows: 15% 70% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .user-details {
            display: flex;
            align-items: center;
            gap:1rem;

            .avatar {
                height: 4rem;
                width: 4rem;
            }
            .username {
                h3 {
                    color:white;
                }
            }
        }

    }

    .chat-messages{
        padding:1rem 2rem;
        display: flex;
        flex-direction: column;
        gap:1rem;
        overflow: auto;
        //flex-direction: column-reverse;
    }

`;