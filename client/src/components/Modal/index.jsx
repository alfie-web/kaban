import clsx from 'clsx'
import { useEffect, memo, useRef } from 'react'

import './Modal.sass'

const Modal = ({ children, onClose = () => {}, isVisible = false, className }) => {
	// console.log('MODAL RENDERS')

	const barWidth = useRef(null)
	const overlayRef = useRef(null)
	const modalRef = useRef(null)

	useEffect(() => {
		document.body.style.overflow = 'hidden'

		const barW = modalRef.current.offsetWidth - modalRef.current.clientWidth
		overlayRef.current.style.width = `calc(100% - ${barW}px)`

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	return isVisible ? (
		<div ref={modalRef} className={clsx('Modal', className)} onMouseUp={(e) => e.stopPropagation()}>
			<div ref={overlayRef} className="Modal__overlay fadeIn" onClick={onClose}></div>
			<div className="Modal__content fadeInUp">
			{barWidth.current}
				{children}
			</div>
		</div>
	) : null
}

export default memo(Modal)