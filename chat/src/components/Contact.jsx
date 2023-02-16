import React,{useEffect, useState} from 'react'
import styled from "styled-components";

export default function Contact({contacts,currentUser,changeChat}) {
    const [currentUserName,setCurrentUserName] = useState(undefined)
    const [currentUserImage,setCurrentUserImage] = useState(undefined)
    const [currentUserSelected,setCurrentUserSelected] = useState(undefined)

    useEffect(() => {
        if (currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    },[currentUser])

    const changeCurrentChat = (index,contact) => {
        changeChat(contact)
        setCurrentUserSelected(index)
    }
    return (
        <>{currentUserName && currentUserImage && 
            <Container>
                <div className="app-name">
                    <h1>React Chat</h1>
                </div>
    
                <div className="contacts">
                    {
                    contacts.map((contact,index) => {
                        return (<div className={`contact ${index === currentUserSelected ? "selected" : ""}`} onClick={() => {changeCurrentChat(index,contact)}}key={index}>
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                            </div>
                            <div className="username">
                                <h2>{contact.username}</h2>
                            </div>
                        </div>)
                    })
                    }                
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                </div>
            </Container>}
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #022764;
    .app-name {
        display: flex;
        align-items: center;
        justify-content: center;
        gap:1rem;

        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        overflow: auto;
        gap:0.8rem;
        
        align-items: center;

        .contact {
            min-height: 4rem;
            width: 90%;
            cursor: pointer;
            border-radius: 1rem;
            padding:0.4rem;
            display: flex;
            align-items:center;
            gap:1rem;
            .avatar{
                img{
                    height: 4rem;
                    margin-top:6px;
                }
            }
            &:hover{
                background-color: rgb(255, 255, 255, 0.16);
            }
            &::-webkit-scrollbar{
                width: 0.2rem;
                &-thumb{
                    background-color: #ffffff39;
                    width: 0.1rem;
                }
            }

        }
        .selected {
            background-color: rgb(1, 22, 56, 0.58);

            &:hover{
                background-color: rgb(26, 24, 60, 0.8);
            }
        }
        h2 {
            color: white;
        }
    }
    
    .current-user{
        background-color: #041f4c;
        display: flex;
        justify-content: center;
        align-items: center;
        gap:2rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        h2 {
            color: white;
        }
    }
`
