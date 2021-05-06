import { useState } from 'react'
import clsx from 'clsx'

import './AddForm.sass'

export default function AddForm({ callback, className, placeholder }) {
   const [text, setText] = useState('')

   const inputChangeHandler = (e) => {
      setText(e.target.value)
   }

   return (
      <div className={clsx('Add__form', className)}>
         <textarea
            name="text"
            placeholder={placeholder}
            value={text}
            autoFocus
            onChange={inputChangeHandler}
            onBlur={() => callback(text)}
         ></textarea>
      </div>
   )
}
