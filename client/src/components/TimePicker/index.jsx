import { memo, useRef, useEffect } from 'react'
import clsx from 'clsx'

import './TimePicker.sass'

function TimePicker({ hours = 10, minutes = 10, seconds = 0, onTimeSelect }) {
	const hoursRef = useRef()
	const minutesRef = useRef()
	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]	

	const onClick = (e) => {
		const number = e.target.closest('.TimePicker__number')
		if (!number) return

		onTimeSelect({ hours, minutes, [number.dataset.type]: number.dataset.value })
	}

	const scrollToTime = (container, el) => {
		if (!el) return

		container.scrollTo({
			top: el.offsetTop - 20,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		const currentSelector = '.TimePicker__number.selected'
		scrollToTime(hoursRef.current, hoursRef.current.querySelector(currentSelector))
		scrollToTime(minutesRef.current, minutesRef.current.querySelector(currentSelector))
	}, [])

	return (
		<div className="TimePicker Scroll" onClick={onClick}>
			<div ref={hoursRef} className="TimePicker__numbers">
				{numbers.map(n => n < 24 && (
					<div 
						className={clsx('TimePicker__number', {'selected': hours === n})} 
						key={n} 
						data-value={n}
						data-type='hours'
					>
						<span>{n}</span>
					</div>
				))}
			</div>
			<div ref={minutesRef} className="TimePicker__numbers">
				{numbers.map(n => (
					<div 
						className={clsx('TimePicker__number', {'selected': minutes === n})}
						key={n} 
						data-value={n}
						data-type='minutes'
					>
						<span>{n}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(TimePicker)
