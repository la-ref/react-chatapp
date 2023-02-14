import {React,useState} from 'react'

export default function Avatars({avatars}) {
  const [selectedAvatar,setSelectedAvatar] = useState(0)

  return (
    <>
        <div className="avatars">
            {avatars && avatars.map((avatar,index) => {
              return(
      
                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)}/>
                </div>
                )
            })}
        </div>
    </>
  )
}
