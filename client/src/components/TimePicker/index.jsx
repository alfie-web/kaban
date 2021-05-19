import { memo, useRef, useEffect, useState } from 'react'
import clsx from 'clsx'

import addZero from '../../helpers/addZero'
import './TimePicker.sass'

function TimePicker({ hours, minutes, onTimeSelect }) {
	const [selected, setSelected] = useState({
		hours, minutes
	})
	const hoursRef = useRef()
	const minutesRef = useRef()
	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]	

	const onChange = (prop, value) => {
		setSelected(prev => ({
			...prev,
			[prop]: value
		}))
	}

	const onClick = (e) => {
		const number = e.target.closest('.TimePicker__number')
		if (!number) return

		onChange(number.dataset.type, +number.dataset.value)

		const scrollContainer = number.dataset.type === 'hours' ? hoursRef.current : minutesRef.current
		scrollToTime(scrollContainer, number)
	}

	const onReset = () => {
		onTimeSelect('')
	}
	const onOk = () => {
		const { hours, minutes } = selected
		const newHours = Number.isNaN(hours) ? 0 : hours
		const newMins = Number.isNaN(minutes) ? 0 : minutes
		onTimeSelect(`${addZero(newHours)}:${addZero(newMins)}`)
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
						className={clsx('TimePicker__number', {'selected': selected.hours === n})} 
						key={n} 
						data-value={n}
						data-type='hours'
					>
						<span>{addZero(n)}</span>
					</div>
				))}
			</div>
			<div ref={minutesRef} className="TimePicker__numbers">
				{numbers.map(n => (
					<div 
						className={clsx('TimePicker__number', {'selected': selected.minutes === n})}
						key={n} 
						data-value={n}
						data-type='minutes'
					>
						<span>{addZero(n)}</span>
					</div>
				))}
			</div>
			<div className="TimePicker__bottom">
				<div className="Link" onClick={onReset}>Сбросить</div>
				<div className="Link" onClick={onOk}>Оk</div>
			</div>
		</div>
	)
}

export default memo(TimePicker)