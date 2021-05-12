import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'

import useOutsideClick from '../../helpers/useOutsideClick'

const DropDown = ({ children, isVisible = false, onClose = () => {}, className }) => {
	const [visible, setVisible] = useState(isVisible)
	const dropRef = useRef()

	useOutsideClick(dropRef, onClose, '.DropDown')

	useEffect(() => {
		setVisible(isVisible)
	}, [isVisible])

	return visible ? (
		<div ref={dropRef} className={clsx('DropDown fadeInUp', className, visible && 'DropDown--visible')}>
			{children}
		</div>
	) : null
}

export default DropDown
