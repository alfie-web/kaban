import { useEffect, useState, useRef } from 'react'
import eventEmitter from '../../helpers/eventEmitter'

import './Flash.sass'

// TODO: Сделать возможность показывать несколько алертов (хранить в массиве)
const Flash = ({ time = 3000 }) => {
   let [visibility, setVisibility] = useState(false)
   let [message, setMessage] = useState('')
   let [type, setType] = useState('')
   let [position, setPosition] = useState('')
   let timer = useRef()

   useEffect(() => {
      eventEmitter.addListener('flash', ({ message, type, position }) => {
         setVisibility(true)
         setMessage(message)
         setType(type)
         setPosition(position)
         timer.current = setTimeout(() => {
            setVisibility(false)
         }, time)
      })
   }, [time])

   const close = () => {
      clearTimeout(timer.current)
      setVisibility(false)
   }

   return (
      visibility && (
         <div className={`Flash Flash-${type} Flash--${position} fadeIn`}>
            <span className="Flash__closeBtn" onClick={close}>
               <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M0.794805 19.0919C0.404281 18.7013 0.32051 18.1519 0.607698 17.8648L17.9525 0.51998C18.2397 0.232792 18.7891 0.316562 19.1796 0.707087C19.5701 1.09761 19.6539 1.64701 19.3667 1.93419L2.02191 19.279C1.73472 19.5662 1.18533 19.4824 0.794805 19.0919Z"
                     fill="white"
                  />
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M19.0919 19.16C18.7014 19.5505 18.152 19.6343 17.8648 19.3471L0.520041 2.00234C0.232853 1.71515 0.316623 1.16576 0.707148 0.775234C1.09767 0.38471 1.64707 0.300939 1.93425 0.588127L19.279 17.9329C19.5662 18.2201 19.4824 18.7695 19.0919 19.16Z"
                     fill="white"
                  />
               </svg>
            </span>

            <p>{message}</p>
         </div>
      )
   )
}

export default Flash
