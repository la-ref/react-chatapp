import React,{useState} from 'react'
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs"

export default function ChatInput({handleSendMsg}) {

    const [showEmojiPicker,setEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("")

    const handleEmojiPicker = () => {
        setEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (emoji) => {
        setMsg(msg+emoji.emoji)
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length >0){
            handleSendMsg()
            setMsg("")
        }
    }
    return (
        <Container>
            <div className='button-container'>
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPicker}></BsEmojiSmileFill>
                    {showEmojiPicker && <Picker height={350} width={250} onEmojiClick={handleEmojiClick} previewConfig={{showPreview:false}} searchDisabled={true}></Picker>}
                </div>
            </div>
            <form className="input-container" onSubmit={sendChat}>
                <input type="text" placeholder="type your message here" value={msg} onChange={(e) => {setMsg(e.target.value)}}></input>
                <button className="submit"><IoMdSend></IoMdSend></button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: transparent;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        justify-content: center;
        color:white;
        gap:1rem;
        .emoji {
            position: relative;
            svg{
                font-size: 1.5rem;
                color:#9055a2;
                cursor:pointer;
            }
            .EmojiPickerReact{
                position: absolute;
                top: -365px;
                background-color: #041f4c;
                --epr-category-label-bg-color : #041f4c;
                --epr-highlight-color:#9055a2;

                .emoji-categories{
                    button {
                        filter: contrast(0);
                    }
                }
            }
        }
    }
    .input-container{
        width: 100%;
        display: flex;
        align-items: center;
        gap:2rem;
        border-radius: 1rem;
        background-color: #041f4c;
        justify-content: center;
        input{
            padding: 0rem 2rem;
            width: 90%;
            height: 60%;
            color: white;
            background-color: transparent;
            font-size: 1.2rem;
            padding-left: 1rem;
            border: none;

            &:focus{
                outline: none;
            }
            
        }
        button{
            padding: 0.6rem 2rem;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9055a2;
            border: none;
            cursor: pointer;
            svg {
                color:white;
                font-size:1.4rem;
            }
            &:hover{
                color: #9055a2;
                background-color: white;

                svg{
                    color:#9055a2
                }
            }
        }
    }
`;