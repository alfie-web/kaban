import clsx from 'clsx'
import { useState } from 'react'

import DropDown from '../../../../../../components/DropDown'
import Button from '../../../../../../components/Button'

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
            // onClick={() => setColorsVisible(!colorsVisible)}
         >
            <h3 className="EditModal__title">Метки</h3>

            <div className="EditModal__selectedMarks">
               {value.map((color) => (
                  <ColorBtn key={color} color={color} />
               ))}

               <Button
                  onClick={() => setColorsVisible(!colorsVisible)}
                  active={colorsVisible}
                  icon={
                     <svg
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M9.25 0C9.66421 0 10 0.335786 10 0.75V8.5H17.75C18.1642 8.5 18.5 8.83579 18.5 9.25C18.5 9.66421 18.1642 10 17.75 10H10V17.75C10 18.1642 9.66421 18.5 9.25 18.5C8.83579 18.5 8.5 18.1642 8.5 17.75V10H0.75C0.335786 10 0 9.66421 0 9.25C0 8.83579 0.335786 8.5 0.75 8.5H8.5V0.75C8.5 0.335786 8.83579 0 9.25 0Z"
                        />
                     </svg>
                  }
               />
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
