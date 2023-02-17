import React from 'react'
import styled from 'styled-components'

export default function Message({messages}) {

  return (
    <Container>

    {messages.length &&
        messages.map((msg,index) => {
            return (<div key={index} className={`message ${msg.fromSelf ? "sended" : "received"}`}>
            <div className='content'>
              <p>{msg.message}</p>
            </div>
          </div>)
        })
    }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
    .message {
        display: flex;
        align-items: center;
        .content {
          max-width: 40%;
          overflow-wrap: break-word;
          padding: 1rem;
          border-radius: 1rem;
          font-size: 1.1rem;
        }
      }
      .sended {
        justify-content: flex-end;
        .content{
          background-color: #00adff;
        }
      }

      .received {
        justify-content: flex-start;
        .content{
          background-color: #05d79d;
        }
      }
`;