import { useState } from 'react'

import Textarea from '../../../../../../components/Textarea'

const DescriptionInput = ({ description = '', onBlur }) => {
	const [value, setValue] = useState(description)

	const onChangeHandler = (e) => {
		setValue(e.target.value)
	}

	return (
		<div className="EditModal__description">
			<Textarea 
				value={value}
				onChange={onChangeHandler}
				placeholder="Описание карточки"
				onBlur={() => onBlur({ prop: 'description', value })}
			/>
		</div>
	)
}

export default DescriptionInput
