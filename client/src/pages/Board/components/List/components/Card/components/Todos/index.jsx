import { memo } from 'react'

const CardTodos = ({ todos }) => {
   return todos.length ? (
      <div className="Card__info">
         <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M2 1.5C1.72386 1.5 1.5 1.72386 1.5 2C1.5 2.27614 1.72386 2.5 2 2.5C2.27614 2.5 2.5 2.27614 2.5 2C2.5 1.72386 2.27614 1.5 2 1.5ZM0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2ZM5.5 2C5.5 1.72386 5.72386 1.5 6 1.5H14C14.2761 1.5 14.5 1.72386 14.5 2C14.5 2.27614 14.2761 2.5 14 2.5H6C5.72386 2.5 5.5 2.27614 5.5 2ZM2 6.5C1.72386 6.5 1.5 6.72386 1.5 7C1.5 7.27614 1.72386 7.5 2 7.5C2.27614 7.5 2.5 7.27614 2.5 7C2.5 6.72386 2.27614 6.5 2 6.5ZM0.5 7C0.5 6.17157 1.17157 5.5 2 5.5C2.82843 5.5 3.5 6.17157 3.5 7C3.5 7.82843 2.82843 8.5 2 8.5C1.17157 8.5 0.5 7.82843 0.5 7ZM5.5 7C5.5 6.72386 5.72386 6.5 6 6.5H14C14.2761 6.5 14.5 6.72386 14.5 7C14.5 7.27614 14.2761 7.5 14 7.5H6C5.72386 7.5 5.5 7.27614 5.5 7ZM2 11.5C1.72386 11.5 1.5 11.7239 1.5 12C1.5 12.2761 1.72386 12.5 2 12.5C2.27614 12.5 2.5 12.2761 2.5 12C2.5 11.7239 2.27614 11.5 2 11.5ZM0.5 12C0.5 11.1716 1.17157 10.5 2 10.5C2.82843 10.5 3.5 11.1716 3.5 12C3.5 12.8284 2.82843 13.5 2 13.5C1.17157 13.5 0.5 12.8284 0.5 12ZM5.5 12C5.5 11.7239 5.72386 11.5 6 11.5H14C14.2761 11.5 14.5 11.7239 14.5 12C14.5 12.2761 14.2761 12.5 14 12.5H6C5.72386 12.5 5.5 12.2761 5.5 12Z"
               fill="#8DA4B9"
            />
         </svg>
      </div>
   ) : null
}

export default memo(CardTodos)

