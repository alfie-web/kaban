import { useState } from 'react'
import clsx from 'clsx'

import Textarea from '../../../../components/Textarea'

export default function AddForm({ callback, className, placeholder }) {
   const [text, setText] = useState('')

   const onChange = e => setText(e.target.value)
   const onBlur = () => callback(text)

   return (
      <div className={clsx('List__addListForm', className)}>
         <Textarea 
            value={text}
            placeholder={placeholder}
            autoFocus
            onChange={onChange}
            onBlur={onBlur}
         />
      </div>
   )
}