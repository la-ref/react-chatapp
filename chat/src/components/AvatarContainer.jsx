import {React} from 'react'
import Avatars from './Avatars';

export default function AvatarContainer({className,avatars,selectedAvatar,setSelectedAvatar,onSubmit}) {

    return (
        <div className={className}>
            <div className="tittle-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <Avatars avatars={avatars} selected={selectedAvatar} setSelected={setSelectedAvatar}></Avatars>
            <button className="submit-btn" onClick={onSubmit}>Set as avatar</button>
        
        </div>
    )
}
