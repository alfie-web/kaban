import { useCallback, useState } from 'react'
import { nanoid } from 'nanoid'

import Button from '../../../../../../components/Button'
import TodoItem from './components/TodoItem'

// TODO:
// Избавиться от useState и не только здесь но и в Marks и тд.
// Возвращать изменённую карточку с сервера
// Возможно даже таблицу в БД сделать для todos
const Todos = ({ todos = [], onChange }) => {
   const [items, setItems] = useState(todos)

   const newTodoHandler = () => {
      if (items.length > 9) return window.flash('Превышен лимит подзадач!', 'info')

      const newTodo = {
         _id: nanoid(),
         title: 'Новая подзадача',
         completed: false,
      }
      
      setItems((prev) => [newTodo, ...prev])
      onChange({
         prop: 'todos',
         value: [newTodo, ...items],
      })
   }

   const changeTodo = (items, id, value) => {
      return items.map(i => {
         if (i._id === id) {
            return {
               ...i,
               ...value
            }
         }
         return i
      })
   }

   const onChangeTodo = useCallback((id, value) => {
      setItems((prev) => changeTodo(prev, id, value))
      onChange({
         prop: 'todos',
         value: changeTodo(items, id, value),
      })
   }, [items, onChange])

   return (
      <div className="EditModal__todos">
         <div className="EditModal__info">
            <h3 className="EditModal__title EditModal__todos-title">
               Чек-лист
               <Button
                  onClick={newTodoHandler}
                  icon={
                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.25 0C9.66421 0 10 0.335786 10 0.75V8.5H17.75C18.1642 8.5 18.5 8.83579 18.5 9.25C18.5 9.66421 18.1642 10 17.75 10H10V17.75C10 18.1642 9.66421 18.5 9.25 18.5C8.83579 18.5 8.5 18.1642 8.5 17.75V10H0.75C0.335786 10 0 9.66421 0 9.25C0 8.83579 0.335786 8.5 0.75 8.5H8.5V0.75C8.5 0.335786 8.83579 0 9.25 0Z" fill="#8DA4B9"/>
                     </svg>
                  }
               />
            </h3>
         </div>

         <div className="EditModal__todos-items">
            {items.length ?
               items.map((todo) => (
                  <TodoItem
                     key={todo._id}
                     _id={todo._id}
                     title={todo.title}
                     completed={todo.completed}
                     onChangeTodo={onChangeTodo}
                  />
               )) : null}
         </div>
      </div>
   )
}

export default Todos
