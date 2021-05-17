import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'

import useOutsideClick from '../../helpers/useOutsideClick'
import './DropDown.sass'

const DropDown = ({
   children,
   isVisible = false,
   onClose = () => {},
   className,
   position = 'down',
}) => {
   const [visible, setVisible] = useState(isVisible)
   const dropRef = useRef()

   useOutsideClick(dropRef, onClose, '.DropDown')

   useEffect(() => {
      setVisible(isVisible)
   }, [isVisible])

   return visible ? (
      <div
         ref={dropRef}
         className={clsx(
            'DropDown',
            className,
            visible && 'DropDown--visible',
				position === 'down' ? 'fadeInUp' : 'fadeIn',
				`DropDown--${position}`
         )}
      >
         <div className="DropDown__content">{children}</div>
      </div>
   ) : null
}

export default DropDown
