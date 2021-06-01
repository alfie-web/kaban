import { useRef } from 'react'
import clsx from 'clsx'

export default function Textarea({
   value,
   onChange,
   onFocus = () => {},
   onBlur = () => {},
   onKeyPress,
   required = false,
   className,
   type = 'text',
   name,
   placeholder,
   title = '',
   autoFocus = false
}) {
   const textRef = useRef()

   const focusHandler = (e) => {
      if (textRef.current) textRef.current.style.height = textRef.current.scrollHeight + 'px'
      onFocus(e)
   }

   const blurHandler = (e) => {
      if (textRef.current) textRef.current.style.height = 54 + 'px'
      onBlur(e)
   }

   return (
      <div className={clsx('Textarea Scroll', className)} title={title}>
         <textarea
            ref={textRef}
            type={type}
            className="Textarea__element"
            autoComplete="off"
            required={required}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onKeyPress={onKeyPress}
            autoFocus={autoFocus}
         >
			</textarea>
      </div>
   )
}
