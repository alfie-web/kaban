import clsx from 'clsx'
import { memo, useMemo } from 'react'

const CardTodos = ({ todos }) => {
   const completedTodos = useMemo(
      () => todos.reduce((acc, cur) => cur.completed ? acc += 1 : acc, 0),
      [todos]
   )
   console.log('completedTodos', completedTodos)

   return todos.length ? (
      <div 
         className={clsx(
            'Card__info', 
            completedTodos && completedTodos === todos.length && 'Card--todos-completed'
         )}
      >
         <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M2.5 1.75C2.08579 1.75 1.75 2.08579 1.75 2.5V11.5C1.75 11.9142 2.08579 12.25 2.5 12.25H11.5C11.9142 12.25 12.25 11.9142 12.25 11.5V2.5C12.25 2.08579 11.9142 1.75 11.5 1.75H2.5ZM0.25 2.5C0.25 1.25736 1.25736 0.25 2.5 0.25H11.5C12.7426 0.25 13.75 1.25736 13.75 2.5V11.5C13.75 12.7426 12.7426 13.75 11.5 13.75H2.5C1.25736 13.75 0.25 12.7426 0.25 11.5V2.5ZM10.4824 3.42572C10.7996 3.69214 10.8407 4.16523 10.5743 4.48239L6.37428 9.48239C6.23465 9.64861 6.02986 9.74618 5.81281 9.74989C5.59576 9.7536 5.38775 9.66308 5.24253 9.50172L3.44253 7.50172C3.16544 7.19384 3.19039 6.71962 3.49828 6.44253C3.80616 6.16544 4.28038 6.19039 4.55747 6.49828L5.78048 7.85718L9.42572 3.51761C9.69214 3.20044 10.1652 3.1593 10.4824 3.42572Z"
            />
         </svg>
      </div>
   ) : null
}

export default memo(CardTodos)

