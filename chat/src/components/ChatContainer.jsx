import React from 'react'
import styled from "styled-components"
import Logout from './Logout';

export default function ChatContainer({currentUser}) {
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
        <div className="chat-input"></div>
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

`;