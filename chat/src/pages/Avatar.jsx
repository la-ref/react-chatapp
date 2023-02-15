import {React,useState,useEffect} from 'react'
import { Navigate } from "react-router-dom";
import axios from "axios";
import unknown from "../assets/unknown.svg"
import {toast} from "react-toastify"
import { getAvatarRoute, getAvatarRoute2 } from '../utils/APIRoutes';
import { AvatarContainerStyled } from '../components/AvatarContainer.styles';
import { Buffer } from 'buffer';
import Loader from '../components/Loader';
import "./Avatar.css"

export default function Avatar() {

    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(0)

    const toastOption = {
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        theme: "dark",
        draggable: false,
        className: {
            background: "white !important"
        }
    }

    const setProflePicture = async () => {
        if (selectedAvatar === undefined){
            toast.error("Please select an avatar",toastOption)
        }
        else{
            const user = await JSON.parse(localStorage.getItem("rchat-app-user"));
            await axios.post()
        }
    }

    const tryLocal = async () => {
        let dataAvatars = []
        for(let i = dataAvatars.length;i<4;i++){
            let image = undefined
            if (i === 0){
                await axios.get(getAvatarRoute2+"test")
                .then((res) => {
                    image = res
                })
                .catch(() => {
                    return dataAvatars
                })

            }else{
                await axios.get(getAvatarRoute2+"test"+(Math.round(Math.random()*1000)).toString())
                .then((res) => {
                    image = res
                })
                .catch(() => {
                    return dataAvatars
                })
            }
            if (image){
                const buff = Buffer.from(image.data);
                dataAvatars.push((buff).toString("base64"))
            }
        }
        return dataAvatars
    
    }

    const tryServer = async (dataAvatars) => {
        for(let i = dataAvatars.length;i<4;i++){
            let image = undefined
            if (i === 0){
                await axios.get(getAvatarRoute+"?username=test")
                .then((res) => {
                    image = res
                })
                .catch(() => {
                    return dataAvatars
                })
                    
            }else{
                await axios.get(getAvatarRoute+"?username=test"+(Math.round(Math.random()*1000)).toString())
                .then((res) => {
                    image = res
                })
                .catch(() => {
                    return dataAvatars
                })
            }
            if (image && image.status === 200){
                dataAvatars.push(image.data.svg)
            }
        }
        return dataAvatars
    }

    const fillArray = async (dataAvatars) => {
        let reader = undefined
        await fetch(unknown)
        .then(r => r.text())
        .then(text => {
            reader = text
        });
        for(let i = 0;i<4;i++){
            if (i <= (dataAvatars.length)){
                if (!dataAvatars[i]){
                    const buff = Buffer.from(reader);
                    dataAvatars[i] = (buff).toString("base64")
                }
            }
            else{
                const buff = Buffer.from(reader);
                dataAvatars.push((buff).toString("base64"))
            }
        }
        return dataAvatars
        
    }

    useEffect( () => {
        (async () => {
            let ava = undefined
            await tryLocal()
            .then(async (res) => {
                ava = res
                if (res.length < 4){
                    await tryServer(res)
                    .then(async (ress) => {
                        ava = ress
                        if (ress.length < 4){
                            await fillArray(ress).then((resss) => {ava = resss;console.log(resss)})
                        }
                    })
                }
            })
            console.log(ava)
            setAvatars(ava)
            setIsLoading(false)})()

    }, [])

    return (
        <div className='avatar-style'>
            { isLoading && <Loader></Loader>}
            {!isLoading && <AvatarContainerStyled avatars={avatars} selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar}>Avatar</AvatarContainerStyled>}
        </div>
    )
}
