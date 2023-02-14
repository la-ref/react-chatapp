import {React,useState,useEffect} from 'react'
import Avatars from './Avatars';

export default function AvatarContainer({className,avatars}) {

    const [isLoading,setIsLoading] = useState(true);

    return (
        <div className={className}>
            <div className="tittle-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <Avatars avatars={avatars}></Avatars>
            <button className="submit-btn">Set as avatar</button>
        
        </div>
    )
}
