import { useState } from 'react'

import addZero from '../../../../../../helpers/addZero'
import Calendar from '../../../../../../components/Calendar'
import DropDown from '../../../../../../components/DropDown'

const DatePicker = ({ date, onChange }) => {
	const [calendarVisible, setCalendarVisible] = useState(false)
	const parsedDate = date ? date.split('.') : [null, null, null]

	const onDateSelect = ({ day, month, year }) => {
		onChange({ prop: 'date', value: `${addZero(day)}.${addZero(month)}.${year}`})
		setCalendarVisible(false)
	}

	const onClose = () => setCalendarVisible(false)

	return (
		<div className="EditModal__date">
			<div 
				className="EditModal__info"
				onClick={() => setCalendarVisible(!calendarVisible)}
			>
				<h3 className="EditModal__title">Дата завершения</h3>
				<span>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.21154 1C5.21154 0.585786 4.87575 0.25 4.46154 0.25C4.04732 0.25 3.71154 0.585786 3.71154 1H5.21154ZM3.71154 2.36364C3.71154 2.77785 4.04732 3.11364 4.46154 3.11364C4.87575 3.11364 5.21154 2.77785 5.21154 2.36364H3.71154ZM16.2885 1C16.2885 0.585786 15.9527 0.25 15.5385 0.25C15.1242 0.25 14.7885 0.585786 14.7885 1H16.2885ZM14.7885 2.36364C14.7885 2.77785 15.1242 3.11364 15.5385 3.11364C15.9527 3.11364 16.2885 2.77785 16.2885 2.36364H14.7885ZM19 6.52273C19.4142 6.52273 19.75 6.18694 19.75 5.77273C19.75 5.35851 19.4142 5.02273 19 5.02273V6.52273ZM1 5.02273C0.585786 5.02273 0.25 5.35851 0.25 5.77273C0.25 6.18694 0.585786 6.52273 1 6.52273V5.02273ZM11.6364 9.42712C11.3012 9.67043 11.2266 10.1394 11.47 10.4746C11.7133 10.8099 12.1823 10.8844 12.5175 10.6411L11.6364 9.42712ZM13.9557 8.67045V7.92045C13.7974 7.92045 13.6432 7.97052 13.5151 8.06348L13.9557 8.67045ZM14.1538 8.67045H14.9038C14.9038 8.25624 14.5681 7.92045 14.1538 7.92045V8.67045ZM13.4038 15.8295C13.4038 16.2438 13.7396 16.5795 14.1538 16.5795C14.5681 16.5795 14.9038 16.2438 14.9038 15.8295H13.4038ZM7.22514 11.2712C6.81093 11.2712 6.47514 11.607 6.47514 12.0212C6.47514 12.4354 6.81093 12.7712 7.22514 12.7712V11.2712ZM8.81399 11.3619L8.28831 10.8269L8.28148 10.8338L8.81399 11.3619ZM9.29558 10.2003L8.54553 10.2003L8.54563 10.2089L9.29558 10.2003ZM4.94273 8.92051C4.72946 9.27559 4.84442 9.73634 5.1995 9.94962C5.55459 10.1629 6.01534 10.0479 6.22861 9.69285L4.94273 8.92051ZM6.01355 14.5134C5.80066 14.1581 5.34003 14.0426 4.98472 14.2555C4.6294 14.4684 4.51394 14.929 4.72684 15.2843L6.01355 14.5134ZM9.02298 12.7661L8.49076 13.2945L8.49172 13.2955L9.02298 12.7661ZM3.07692 3.75H16.9231V2.25H3.07692V3.75ZM16.9231 3.75C17.6828 3.75 18.25 4.33607 18.25 5H19.75C19.75 3.45479 18.4574 2.25 16.9231 2.25V3.75ZM18.25 5V17H19.75V5H18.25ZM18.25 17C18.25 17.6639 17.6828 18.25 16.9231 18.25V19.75C18.4574 19.75 19.75 18.5452 19.75 17H18.25ZM16.9231 18.25H3.07692V19.75H16.9231V18.25ZM3.07692 18.25C2.31715 18.25 1.75 17.6639 1.75 17H0.25C0.25 18.5452 1.54259 19.75 3.07692 19.75V18.25ZM1.75 17V5H0.25V17H1.75ZM1.75 5C1.75 4.33607 2.31715 3.75 3.07692 3.75V2.25C1.54259 2.25 0.25 3.45479 0.25 5H1.75ZM3.71154 1V2.36364H5.21154V1H3.71154ZM14.7885 1V2.36364H16.2885V1H14.7885ZM19 5.02273H1V6.52273H19V5.02273ZM12.5175 10.6411L14.3962 9.27743L13.5151 8.06348L11.6364 9.42712L12.5175 10.6411ZM13.9557 9.42045H14.1538V7.92045H13.9557V9.42045ZM13.4038 8.67045V15.8295H14.9038V8.67045H13.4038ZM7.22514 12.7712C7.76741 12.7712 8.69997 12.5419 9.3465 11.8901L8.28148 10.8338C8.14252 10.9739 7.9483 11.0874 7.73335 11.1657C7.51565 11.245 7.32357 11.2712 7.22514 11.2712V12.7712ZM9.33962 11.8969C9.56591 11.6746 9.74537 11.4093 9.86683 11.1163L8.48119 10.5418C8.43724 10.6478 8.37188 10.7449 8.28836 10.8269L9.33962 11.8969ZM9.86683 11.1163C9.98831 10.8233 10.0492 10.5088 10.0455 10.1917L8.54563 10.2089C8.54693 10.3227 8.52513 10.4358 8.48119 10.5418L9.86683 11.1163ZM10.0456 10.2003C10.0456 9.39539 9.68002 8.7528 9.12005 8.33277C8.58111 7.92852 7.89432 7.75 7.22341 7.75V9.25C7.64722 9.25 7.99651 9.36509 8.21998 9.53271C8.42241 9.68456 8.54558 9.89211 8.54558 10.2003H10.0456ZM7.22341 7.75C6.004 7.75 5.2494 8.40992 4.94273 8.92051L6.22861 9.69285C6.29665 9.57956 6.59091 9.25 7.22341 9.25V7.75ZM4.72684 15.2843C4.99958 15.7396 5.84193 16.75 7.26885 16.75V15.25C6.60413 15.25 6.16311 14.763 6.01355 14.5134L4.72684 15.2843ZM7.26885 16.75C8.01613 16.75 8.75286 16.5457 9.32087 16.1038C9.9067 15.648 10.274 14.9656 10.274 14.1327H8.77404C8.77404 14.4878 8.63231 14.739 8.39981 14.9199C8.14949 15.1146 7.75863 15.25 7.26885 15.25V16.75ZM10.274 14.1327C10.274 13.4534 10.0727 12.7569 9.55424 12.2366L8.49172 13.2955C8.65868 13.463 8.77404 13.7364 8.77404 14.1327H10.274ZM9.5552 12.2376C8.84666 11.524 7.81851 11.2712 7.22514 11.2712V12.7712C7.34938 12.7712 7.57836 12.8034 7.83429 12.8965C8.08752 12.9885 8.32102 13.1235 8.49076 13.2945L9.5552 12.2376Z" fill="#8DA4B9"/>
					</svg>
					{date}
				</span>
			</div>

			<DropDown
				isVisible={calendarVisible}
				onClose={onClose}
				className="EditModal__calendar EditModal__dropdown"
			>
				<Calendar
					day={+parsedDate[0]}
					month={+parsedDate[1]}
					year={+parsedDate[2]}
					onDaySelect={onDateSelect}
				/>
			</DropDown>
		</div>
	)
}

export default DatePicker
