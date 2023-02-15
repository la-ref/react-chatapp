import {React,useState} from 'react'
import Avatars from './Avatars';
import {toast} from "react-toastify"
import axios from 'axios';

export default function AvatarContainer({className,avatars,selectedAvatar,setSelectedAvatar}) {

    const handleSubmit = () => {

    }

    return (
        <div className={className}>
            <div className="tittle-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <Avatars avatars={avatars} selected={selectedAvatar} setSelected={setSelectedAvatar} onSumbit={handleSubmit}></Avatars>
            <button className="submit-btn">Set as avatar</button>
        
        </div>
    )
}
