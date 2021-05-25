import { useMemo, memo } from 'react'
import clsx from 'clsx'

const CardsDate = ({ date, time }) => {
   const parsedDateToCompare = useMemo(
      () => date.split('.').reverse().join('.') + ` ${time}`,
      [date, time]
   )

   return date ? (
      <time
         className={clsx(
            'Card__info',
            new Date() > new Date(parsedDateToCompare) && 'Card--past'
         )}
         title={date + ':' + time}
      >
         <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M8.24989 3.16667C8.24989 2.75245 7.91411 2.41667 7.49989 2.41667C7.08568 2.41667 6.74989 2.75245 6.74989 3.16667H8.24989ZM7.49989 8.04167H6.74989C6.74989 8.45588 7.08568 8.79167 7.49989 8.79167V8.04167ZM10.7499 8.79167C11.1641 8.79167 11.4999 8.45588 11.4999 8.04167C11.4999 7.62745 11.1641 7.29167 10.7499 7.29167V8.79167ZM7.5 0.25C3.49724 0.25 0.25 3.49724 0.25 7.5H1.75C1.75 4.32567 4.32567 1.75 7.5 1.75V0.25ZM0.25 7.5C0.25 11.5028 3.49724 14.75 7.5 14.75V13.25C4.32567 13.25 1.75 10.6743 1.75 7.5H0.25ZM7.5 14.75C11.5028 14.75 14.75 11.5028 14.75 7.5H13.25C13.25 10.6743 10.6743 13.25 7.5 13.25V14.75ZM14.75 7.5C14.75 3.49724 11.5028 0.25 7.5 0.25V1.75C10.6743 1.75 13.25 4.32567 13.25 7.5H14.75ZM6.74989 3.16667V8.04167H8.24989V3.16667H6.74989ZM7.49989 8.79167H10.7499V7.29167H7.49989V8.79167Z" />
         </svg>
      </time>
   ) : null
}

export default memo(CardsDate)
