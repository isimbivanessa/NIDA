import React, { useRef } from 'react'

const ProfileImage = (props) => {

    const imageElement = useRef()
    
  return (
    <div><img ref={imageElement} style={{width:'100px'}} src={`data:image/png;base64,${props.photo}`} alt='Profile' /></div>
  )
}

export default ProfileImage
