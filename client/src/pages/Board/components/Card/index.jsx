import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import { Draggable } from 'react-beautiful-dnd'

// import { Button } from '../';
// import { useOutsideClickHandler } from '../../hooks'
import './Card.sass'

function Card({
   card,
   className,
   index,
   // onEditCardHandler,
   // onDeleteCardHandler,
}) {
   const { _id, title } = card
   const [editMode, setEditMode] = useState(false)
   const [isEditing, setIsEditing] = useState(false)
   const [newCardText, setNewCardText] = useState(title)
   const editBlock = useRef(null)

   // const handleEditMode = () => {
   //    setEditMode(false)
   //    setIsEditing(true)
   // }

   // const onEndEditing = () => {
   //    setIsEditing(false)
   //    if (text === newCardText) return

   //    onEditCardHandler(_id, newCardText)
   // }

   // const onDeleteCard = () => {
   //    setEditMode(false)
   //    onDeleteCardHandler(_id)
   // }

   // useOutsideClickHandler(editBlock, () => setEditMode(false), '.Card__btn')

   return (
      <Draggable draggableId={_id} index={index}>
         {(provided, snapshot) => (
            <div
               {...provided.draggableProps}
               {...provided.dragHandleProps} // Эта штука отвечает за зону за которую можно потянуть. Если нам нужно тянуть карточку не за всю целиком а за заголовок, мы должны передать эти пропсы туда
               ref={provided.innerRef}
               className={clsx('Card', className, {
                  'Card--dragging': snapshot.isDragging,
                  'Card--editMode': editMode,
                  'Card--editing': isEditing,
               })}
               // onDoubleClick={ () => !isEditing && setEditMode(true) }
            >
               {!isEditing && (
                  <div
                     className="Card__text"
                     onDoubleClick={() => setEditMode(true)}
                  >
                     {title}
                  </div>
               )}
               {/* {editMode && (
                  <div className="Card__edit" ref={editBlock}>
                     <div
                        className="Card__btn"
                        title="Редактировать карточку"
                        // onClick={handleEditMode}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           x="0px"
                           y="0px"
                           viewBox="0 0 528.899 528.899"
                        >
                           <path
                              d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
										c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
										C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
										L27.473,390.597L0.3,512.69z"
                           />
                        </svg>
                     </div>
                     <div
                        className="Card__btn"
                        title="Удалить карточку"
                        // onClick={onDeleteCard}
                     >
                        <svg
                           viewBox="0 0 515.556 515.556"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="m64.444 451.111c0 35.526 28.902 64.444 64.444 64.444h257.778c35.542 0 64.444-28.918 64.444-64.444v-322.222h-386.666z" />
                           <path d="m322.222 32.222v-32.222h-128.889v32.222h-161.111v64.444h451.111v-64.444z" />
                        </svg>
                     </div>
                  </div>
               )} */}

               {/* {isEditing && (
                  <textarea
                     type="text"
                     className="Card__textarea"
                     autoFocus
                     value={newCardText}
                     onChange={(e) => setNewCardText(e.target.value)}
                     // onBlur={onEndEditing}
                  ></textarea>
               )} */}
            </div>
         )}
      </Draggable>
   )
}

export default Card
