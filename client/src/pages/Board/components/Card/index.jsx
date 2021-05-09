import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import { Draggable } from 'react-beautiful-dnd'

import Avatar from '../../../../components/Avatar'


import './Card.sass'

function Card({
   card,
   className,
   index,
   // onEditCardHandler,
   // onDeleteCardHandler,
}) {
   const { _id, title, marks, date, time, responsibleUsers } = card
   const [editMode, setEditMode] = useState(false)
   // const [isEditing, setIsEditing] = useState(false)
   // const [newCardText, setNewCardText] = useState(title)
   // const editBlock = useRef(null)

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
                  // 'Card--editing': isEditing,
               })}
               // onDoubleClick={ () => !isEditing && setEditMode(true) }
            >
               {marks && marks.length ? (
                  <div className="Card__marks">
                     {marks.map(m => (
                        <span className="Card__mark" key={m} style={{backgroundColor: `#${m}`}}></span>
                     ))}
                  </div>
               ): null}

               {/* {!isEditing && ( */}
                  <div
                     className="Card__text"
                     onDoubleClick={() => setEditMode(true)}
                  >
                     {title}
                  </div>
               {/* )} */}

               <div className="Card__bottom">
                  <div className="Card__bottom-left">
                     {date ? <time className="Card__info" title={date + ':' + time}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M8.24989 3.16667C8.24989 2.75245 7.91411 2.41667 7.49989 2.41667C7.08568 2.41667 6.74989 2.75245 6.74989 3.16667H8.24989ZM7.49989 8.04167H6.74989C6.74989 8.45588 7.08568 8.79167 7.49989 8.79167V8.04167ZM10.7499 8.79167C11.1641 8.79167 11.4999 8.45588 11.4999 8.04167C11.4999 7.62745 11.1641 7.29167 10.7499 7.29167V8.79167ZM7.5 0.25C3.49724 0.25 0.25 3.49724 0.25 7.5H1.75C1.75 4.32567 4.32567 1.75 7.5 1.75V0.25ZM0.25 7.5C0.25 11.5028 3.49724 14.75 7.5 14.75V13.25C4.32567 13.25 1.75 10.6743 1.75 7.5H0.25ZM7.5 14.75C11.5028 14.75 14.75 11.5028 14.75 7.5H13.25C13.25 10.6743 10.6743 13.25 7.5 13.25V14.75ZM14.75 7.5C14.75 3.49724 11.5028 0.25 7.5 0.25V1.75C10.6743 1.75 13.25 4.32567 13.25 7.5H14.75ZM6.74989 3.16667V8.04167H8.24989V3.16667H6.74989ZM7.49989 8.79167H10.7499V7.29167H7.49989V8.79167Z" fill="#8DA4B9"/>
                        </svg>
                        <span>{date.slice(0, 5)}</span>
                     </time> : null}
                  </div>

                  <div className="Card__bottom-right">
                     {responsibleUsers && responsibleUsers.length ? responsibleUsers.map(user => (
                        <Avatar 
                           key={user._id}
                           url={user?.avatar}
                           userName={user.fullname}
                           min
                        />
                     )) : null}
                  </div>
               </div>





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
