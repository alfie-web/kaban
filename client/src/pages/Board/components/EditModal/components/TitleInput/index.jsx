import { useState } from 'react'

import Input from '../../../../../../components/Input'

const TitleInput = ({ title = '', changeFormData, onBlur }) => {
	const [value, setValue] = useState(title)

	const onChangeHandler = (e) => {
		setValue(e.target.value)
		// changeFormData('title', e.target.value)
	}

	return (
		<div className="EditModal__title">
			<Input 
				value={value}
				onChange={onChangeHandler}
				placeholder="Название карточки"
				onBlur={() => onBlur({ prop: 'title', value })}
			/>
		</div>
	)
}

export default TitleInput
