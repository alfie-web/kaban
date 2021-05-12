import clsx from 'clsx'
import { useEffect, memo } from 'react'

import './Modal.sass'

const Modal = ({ children, onClose = () => {}, isVisible = false, className }) => {
	console.log('MODAL RENDERS')
	useEffect(() => {
		isVisible 
			? document.body.style.overflow = 'hidden'
			: document.body.style.overflow = 'auto'

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isVisible])

	return (
		<div className={clsx('Modal', className)} onMouseUp={(e) => e.stopPropagation()}>
			<div className="Modal__overlay fadeIn" onClick={onClose}></div>
			<div className="Modal__content fadeInUp">
				{children}
			</div>
		</div>
	)
}

export default memo(Modal)
