import { useState } from 'react'

import Input from '../../../../../../../../components/Input'
import Checkbox from '../../../../../../../../components/Checkbox'

const TodoItem = ({ _id, title, completed, onChangeTodo }) => {
	const [todoTitle, setTodoTitle] = useState(title)

	const onComplete = (data) => {
		onChangeTodo(_id, { completed: data })
	}

	const onChange = (e) => {
		setTodoTitle(e.target.value)
	}
	const onBlur = () => {
		if (title !== todoTitle) onChangeTodo(_id, { title: todoTitle })
	}

	return (
		<div className="EditModal__todos-item">
			<Checkbox
				checked={completed}
				onChange={onComplete}
			/>

			<Input
				value={todoTitle}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	)
}

export default TodoItem
