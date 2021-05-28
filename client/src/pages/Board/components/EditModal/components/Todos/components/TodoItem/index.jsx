import { useState } from 'react'

import Input from '../../../../../../../../components/Input'
import Checkbox from '../../../../../../../../components/Checkbox'
import Button from '../../../../../../../../components/Button'

const TodoItem = ({ _id, title, completed, onChangeTodo, onDeleteTodo }) => {
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

	const onDelete = () => {
		onDeleteTodo(_id)
	}

	return (
      <div className="EditModal__todos-item">
         <Checkbox checked={completed} onChange={onComplete} />

         <Input value={todoTitle} onChange={onChange} onBlur={onBlur} />

         <Button
            icon={
               <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M11.4852 1.12131C11.7781 1.4142 11.7781 1.88908 11.4852 2.18197L7.36388 6.30329L11.4852 10.4246C11.7781 10.7175 11.7781 11.1924 11.4852 11.4853C11.1923 11.7782 10.7174 11.7782 10.4245 11.4853L6.30322 7.36395L2.1819 11.4853C1.88901 11.7782 1.41414 11.7782 1.12124 11.4853C0.82835 11.1924 0.828349 10.7175 1.12124 10.4246L5.24256 6.30329L1.12124 2.18197C0.82835 1.88908 0.82835 1.4142 1.12124 1.12131C1.41414 0.828418 1.88901 0.828417 2.1819 1.12131L6.30322 5.24263L10.4245 1.12131C10.7174 0.828417 11.1923 0.828418 11.4852 1.12131Z"
                  />
               </svg>
            }
            onClick={onDelete}
         />
      </div>
   )
}

export default TodoItem
