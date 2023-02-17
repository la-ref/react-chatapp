import React,{useState,useEffect,useRef} from 'react'
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import axios from "axios"
import { allUsersRoute, getMsgRoute, host } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import Loader from '../components/Loader';
import { sendMsgRoute } from '../utils/APIRoutes';
import {io} from "socket.io-client"

export default function Chat() {
  const socket = useRef();
  const [contacts,setContacts] = useState([]);
  const [currentChat,setCurrentChat] = useState(undefined);
  const [me] = useState(JSON.parse(localStorage.getItem("rchat-app-user")))
  const [isLoading,setIsLoading] = useState(true);

  const [messages,setMessages] = useState([]);

  const [arrivalInfo,setArrivalInfo] = useState([]);

  const scrollRef = useRef();

  useEffect(()=>{ 
    if (me){
      socket.current = io(host)
      socket.current.emit("add-user",me._id)
      socket.current.on("msg-receive", (data) => {
        setArrivalInfo(data)
      })
    }
  },[])

  useEffect(()=>{ 
    if (me && currentChat && arrivalInfo.from === currentChat._id){
      const copyMsg = [...messages]
      copyMsg.push({fromSelf:false,message:arrivalInfo.msg})
      setMessages(copyMsg)
    }
  },[arrivalInfo])
  
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
      if (currentChat && me){
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    })()
  },[messages])

  useEffect(() => {
    (async () => {
      if (currentChat && me){
        const response = await axios.post(getMsgRoute,{
          from: me._id,
          to:currentChat._id
        })
        setMessages(response.data.msg)
      }
    })()
  },[currentChat])

  const changeCurrentChat = (chat) => {
    console.log("WHAT",chat)
    setCurrentChat(chat)
  }

  const handleSendMsg = async (msg) => {
    await axios.post(sendMsgRoute,{
      from:me._id,
      to:currentChat._id,
      message:msg
    })
    console.log(socket)
    socket.current.emit("send-msg", {
      from:me._id,
      to:currentChat._id,
      message:msg
    })

    // pour afficher notre message quand on l'envoie
    const copyMsg = [...messages]
    copyMsg.push({fromSelf:true,message:msg})
    setMessages(copyMsg)
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
        {(currentChat && !isLoading ) && <ChatContainer scrollRef={scrollRef} currentChat={currentChat} handleMsg={handleSendMsg} messages={messages}></ChatContainer>}
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
