import clsx from 'clsx'
import { useState } from 'react'

import DropDown from '../../../../../../components/DropDown'

const colors = ['FF1834', 'AA4FF2', '4F69F2', '65D30E', 'FF6107', 'FDCC20', 'FF5BAA', '26C3E5']

const ColorBtn = ({ color, isSelected, onClick }) => (
   <div
      onClick={onClick}
      title={`#${color}`}
      className={clsx(
         'ColorPicker__color',
         isSelected && 'ColorPicker__color--selected'
      )}
      style={{ backgroundColor: `#${color}` }}
   >
		{isSelected ? (
			<svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11.5 1L5.2 9L1 4.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		) : null}
	</div>
)

const Marks = ({ marks = [], onChange = () => {} }) => {
	const [value, setValue] = useState(marks)
	const [colorsVisible, setColorsVisible] = useState(false)

	const onClose = () => {
		if (JSON.stringify(value) !== JSON.stringify(marks)) {
			console.log(value)
			onChange({
				prop: 'marks', value
			})
		} 
		setColorsVisible(false)
	}

	const onSelect = (color) => {
		if (value.includes(color)) {
			setValue(prev => ([
				...prev.filter(m => m !== color),
			]))

		} else {
			setValue(prev => ([
				...prev,
				color
			]))
		}
	}

	return (
      <div className="EditModal__marks">
         <div
            className="EditModal__info"
            onClick={() => setColorsVisible(!colorsVisible)}
         >
            <h3 className="EditModal__title">Метки</h3>

            <div className="EditModal__selectedMarks">
               {value.map((color) => (
                  <ColorBtn key={color} color={color} />
               ))}

               <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fillRule="evenodd" clipRule="evenodd" d="M9.5 0C10.0523 0 10.5 0.447715 10.5 1V8.5H18C18.5523 8.5 19 8.94771 19 9.5C19 10.0523 18.5523 10.5 18 10.5H10.5V18C10.5 18.5523 10.0523 19 9.5 19C8.94771 19 8.5 18.5523 8.5 18V10.5H1C0.447715 10.5 0 10.0523 0 9.5C0 8.94771 0.447715 8.5 1 8.5H8.5V1C8.5 0.447715 8.94771 0 9.5 0Z" fill="#8DA4B9"/>
               </svg>
            </div>
         </div>

         <DropDown
            isVisible={colorsVisible}
            onClose={onClose}
            className="EditModal__dropdown ColorPicker"
         >
            {/* <div className="ColorPicker"> */}
               {colors.map((color) => (
                  <ColorBtn
                     key={color}
                     color={color}
                     isSelected={value.includes(color)}
							onClick={() => onSelect(color)}
                  />
               ))}
            {/* </div> */}
         </DropDown>
      </div>
   )
}

export default Marks
