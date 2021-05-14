import clsx from 'clsx'

export default function Textarea({
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
   title = '',
}) {
   return (
      <div className={clsx('Textarea Scroll', className)} title={title}>
         <textarea
            type={type}
            className="Textarea__element"
            autoComplete="off"
            required={required}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
         >
			</textarea>
      </div>
   )
}
