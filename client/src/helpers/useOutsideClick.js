import { useEffect } from 'react'

const useOutsideClick = (ref, onCloseCallback, allowedClickSelector) => {
   const handleOutsideClick = (e) => {
      if (
         ref.current &&
         !ref.current.contains(e.target) &&
         !e.target.closest(allowedClickSelector)
      ) {
         onCloseCallback()
      }
   }

   useEffect(() => {
      document.addEventListener('click', handleOutsideClick)

      return () => {
         document.removeEventListener('click', handleOutsideClick)
      }
   })
}

export default useOutsideClick