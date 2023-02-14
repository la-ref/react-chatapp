import styled from "styled-components"
import AvatarContainer from "./AvatarContainer"

export const AvatarContainerStyled = styled(AvatarContainer)`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2E294E;

    h1 {
        text-align: center;
        color: white;
        text-shadow: 0px 0px 10px rgba(255,255,255,0.32);
    }

    .avatars {
        display: flex;
        gap:2rem;
        margin-top: 2rem;
        .avatar{
            border:0.5rem solid transparent;   
            border-radius: 50%;
            padding: 4px;
            transition:0.4s ease-in-out;   
            display:flex;
            align-items:center;
            justify-content: center;
            img{
                width: 6rem;
            }
            &:hover{
                cursor: pointer;
            }
        }

        .selected {
            border:0.5rem solid white; 
        }
    }

    .submit-btn {
        font-size: 1rem;
        font-weight:500;
        text-transform: uppercase;
        color: white;
        width: auto;
        padding: 0.5rem 3rem;
        border-radius:1rem;
        border-top-style: hidden;
        border-right-style: hidden;
        border-left-style: hidden;
        border-bottom-style: hidden;
        margin: 0 auto;
        background: #9055a2;
        //box-shadow: 6px 6px 16px -3px rgba(255,255,255,0.6);
        font-family: "Poppins",sans-serif;
        text-shadow: 0px 0px 16px rgba(255,255,255,0.48);
        transition: 0.3s ease-in-out;
        cursor: pointer;

        margin-top: 2rem;
    }

`