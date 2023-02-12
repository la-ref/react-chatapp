import styled from "styled-components"
import FormContainer from "./FormContainer"

export const FormContainerStyled = styled(FormContainer)`
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

    form {
        width:100%;
        max-width: 400px;
        min-width: 200px;
        margin: 2rem;
        display: flex;
        flex-direction: column;
        gap:1.5rem;
        padding: 4rem;
        border-radius: 1rem;


        input {
            background-color: #011638;
            padding: 1rem;
            box-shadow: none;
            border-top-style: hidden;
            border-right-style: hidden;
            border-left-style: hidden;
            border-bottom-style: hidden;
            border-radius:1rem;
            outline: none;
            box-shadow: 0px 4px 24px -5px rgba(25,14,79,0.6);
            
            &[type]{
                color: white;
            }

        }

        button {
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
            margin: auto;
            background: #9055a2;
            //box-shadow: 6px 6px 16px -3px rgba(255,255,255,0.6);
            font-family: "Poppins",sans-serif;
            text-shadow: 0px 0px 16px rgba(255,255,255,0.48);
            transition: 0.3s ease-in-out;
            cursor: pointer;

            &:hover{
                color: #9055a2;
                background-color: white;
            }
        }

        p {
            color: white;
            text-align: center;
        }

        a {
            color: #9055a2;
        }

    }
`