import { useState } from 'react'

import TimePicker from '../../../../../../components/TimePicker'
import DropDown from '../../../../../../components/DropDown'

const Time = ({ time, onChange }) => {
	const [isVisible, setIsVisible] = useState(false)
	const parsedTime = time ? time.split(':') : [NaN, NaN]
	// const parsedTime = time ? time.split(':') : [0, 0]

	const onTimeSelect = (newTime) => {
		onChange({ prop: 'time', value: newTime})
		// onChange({ prop: 'time', value: `${hours}:${minutes}`})
		// onChange({ prop: 'time', value: `${addZero(hours)}:${addZero(minutes)}`})
		setIsVisible(false)
	}

	const onClose = () => setIsVisible(false)

	return (
		<div className="EditModal__timepicker">
			<div 
				className="EditModal__info"
				onClick={() => setIsVisible(!isVisible)}
			>
				<h3 className="EditModal__title">Время завершения</h3>
				<span>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.75 4.00001C10.75 3.5858 10.4142 3.25001 10 3.25001C9.58579 3.25001 9.25 3.5858 9.25 4.00001H10.75ZM10 10.75H9.25C9.25 11.1642 9.58579 11.5 10 11.5V10.75ZM14.5 11.5C14.9142 11.5 15.25 11.1642 15.25 10.75C15.25 10.3358 14.9142 10 14.5 10V11.5ZM10 0.25C4.61704 0.25 0.25 4.61704 0.25 10H1.75C1.75 5.44546 5.44546 1.75 10 1.75V0.25ZM0.25 10C0.25 15.383 4.61704 19.75 10 19.75V18.25C5.44546 18.25 1.75 14.5545 1.75 10H0.25ZM10 19.75C15.383 19.75 19.75 15.383 19.75 10H18.25C18.25 14.5545 14.5545 18.25 10 18.25V19.75ZM19.75 10C19.75 4.61704 15.383 0.25 10 0.25V1.75C14.5545 1.75 18.25 5.44546 18.25 10H19.75ZM9.25 4.00001V10.75H10.75V4.00001H9.25ZM10 11.5H14.5V10H10V11.5Z" fill="#8DA4B9"/>
					</svg>

					{time}
				</span>
			</div>

			<DropDown
				isVisible={isVisible}
				onClose={onClose}
				className="EditModal__dropdown EditModal__time"
			>
				<TimePicker 
					hours={+parsedTime[0]}
					minutes={+parsedTime[1]}
					onTimeSelect={onTimeSelect}
				/>
			</DropDown>
		</div>
	)
}

export default Time
