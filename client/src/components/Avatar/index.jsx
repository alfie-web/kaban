import React from 'react'
import clsx from 'clsx'

import './Avatar.sass'

function getAvatarColor(letter) {
   const letterCode = letter.charCodeAt()
   if (
      (letterCode >= 1048 && letterCode <= 1055) ||
      (letterCode >= 72 && letterCode <= 78)
   ) {
      return {
         background: '#fbd1d9',
         color: '#EC1A3F',
      }
   }
   if (
      (letterCode >= 1049 && letterCode <= 1063) ||
      (letterCode >= 79 && letterCode <= 85)
   ) {
      return {
         background: '#e8d5fb',
         color: '#8E2FEC',
      }
   }
   if (
      (letterCode >= 1064 && letterCode <= 1071) ||
      (letterCode >= 86 && letterCode <= 90)
   ) {
      return {
         background: '#fff2cf',
         color: '#FFBC0F',
      }
   }
   return {
      background: '#cee9f9',
      color: '#0A93E0',
   }
}

const AvatarGradient = ({ userName }) => {
   const colors = getAvatarColor(userName.substr(0, 1))
   return (
      <div
         className="Avatar__gradient"
         style={{ background: colors.background, color: colors.color }}
      >
         <span>{userName.substr(0, 1)}</span>
      </div>
   )
}

export default function Avatar({ url, userName, min, className }) {
   return (
      <div
         className={clsx('Avatar', className, { 'Avatar-min': min })}
         title={userName}
      >
         {url ? (
            <img src={url} alt={`Avatar: ${userName}`} />
         ) : (
            <AvatarGradient userName={userName} />
         )}
      </div>
   )
}
