import React from 'react'
import styled from "styled-components"
import ChatInput from './ChatInput';
import Logout from './Logout';
import Message from './Message';

export default function ChatContainer({currentUser}) {

    const handleSendMsg = async (msg) => {

    }
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar"/>
                    </div>
                    <div className="username">
                        <h3>{currentUser.username}</h3>
                    </div>
                </div>
                <Logout></Logout>
            </div>
            <div className="chat-messages">
                <Message></Message>
                <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
            </div>
        </Container>
  )
}

const Container = styled.div`
    padding-top: 1rem;
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
        height: 100%;
    }

`;