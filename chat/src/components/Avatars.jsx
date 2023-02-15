import {React} from 'react'

export default function Avatars({avatars,selected,setSelected}) {

  return (
    <>
        <div className="avatars">
            {avatars && avatars.map((avatar,index) => {
              return(
      
                <div key={index} className={`avatar ${selected === index ? "selected" : ""}`}>
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelected(index)}/>
                </div>
                )
            })}
        </div>
    </>
  )
}
