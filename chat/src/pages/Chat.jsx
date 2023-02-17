import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import axios from "axios"
import { allUsersRoute, getMsgRoute } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import Loader from '../components/Loader';
import { sendMsgRoute } from '../utils/APIRoutes';

export default function Chat() {
  const [contacts,setContacts] = useState([]);
  const [currentChat,setCurrentChat] = useState(undefined);
  const [me] = useState(JSON.parse(localStorage.getItem("rchat-app-user")))
  const [isLoading,setIsLoading] = useState(true);

  const [messages,setMessages] = useState([]);
  
  useEffect(()=>{
    (async () => {
      try {
        if (me && me.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${me._id}`)
          setContacts(data.data.users)
          setIsLoading(false)
        }
      }
      catch(e){return}

    })()
  },[])

  useEffect(() => {
    (async () => {
      if (currentChat){
        const response = await axios.post(getMsgRoute,{
          from: me._id,
          to:currentChat._id
        })
        setMessages(response.data.msg)
      }
    })()
  },[currentChat])

  const changeCurrentChat = (chat) => {
    setCurrentChat(chat)
  }

  const handleSendMsg = async (msg) => {
    await axios.post(sendMsgRoute,{
      from:me._id,
      to:currentChat._id,
      message:msg
    })
}
  return (
    <Container>
      { isLoading && <Loader></Loader>}
      {(!me) && (
        <Navigate to="/login" replace={true} />
      )}
      {(me && !me.isAvatarImageSet) && (
        <Navigate to="/setavatar" replace={true} />
      )}
      {!isLoading && (<div className='ct-container'>
        <Contact contacts={contacts} currentUser={me} changeChat={changeCurrentChat}></Contact>
        {(!currentChat && !isLoading) && <Welcome currentUser={me}></Welcome>}
        {(currentChat && !isLoading ) && <ChatContainer currentChat={currentChat} handleMsg={handleSendMsg} messages={messages}></ChatContainer>}
      </div>)}
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display:flex;
  flex-direction:column;
  justify-content: center;
  gap:1rem;
  align-items: center;
  background-color:#2E294E;

  .ct-container{
    height: 85vh;
    width: 85vw;
    background-color: #011638;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width:1080px){
      grid-template-columns: 35% 65%;
    }
  }
`
