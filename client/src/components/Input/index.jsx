import clsx from 'clsx'

import './Input.sass'

export default function Input({
   value,
   onChange,
   onFocus,
   onBlur,
   onKeyPress,
   required = false,
   className,
   type = 'text',
   name,
   placeholder,
   icon,
   title = '',
   autoFocus = false
}) {
   return (
      <div className={clsx('Input', className)} title={title}>
         <input
            type={type}
            className="Input__element"
            autoComplete="off"
            required={required}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            autoFocus={autoFocus}
         />

         {icon && <div className="Input__icon">{icon}</div>}
      </div>
   )
}
