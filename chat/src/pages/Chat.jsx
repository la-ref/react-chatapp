import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import axios from "axios"
import { allUsersRoute } from '../utils/APIRoutes';
import Contact from '../components/Contact';

export default function Chat() {
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const me = JSON.parse(localStorage.getItem("rchat-app-user"))
  useEffect(()=>{
    (async () => {
      try {
        if (me && me.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${me._id}`)
          setContacts(data.data)
        }
      }
      catch(e){console.log(e);return}

    })()
    console.log(me)
  },[])
  return (
    <Container>
      {(!me) && (
        <Navigate to="/login" replace={true} />
      )}
      {(me && !me.isAvatarImageSet) && (
        <Navigate to="/setavatar" replace={true} />
      )}
      <div className='ct-container'>
        <Contact contacts={contacts} currentUser={currentUser}></Contact>
      </div>
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
