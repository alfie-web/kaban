import React, { useState, useRef, memo } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { fetchCards, createCard } from '../../../../store/reducers/lists'
import useLazyLoading from '../../../../helpers/useLazyLoading'

import Card from '../Card'
import AddForm from '../AddForm'
import ListOptionsDropDown from './components/ListsOptionsDropDown'
import './List.sass'

// TODO: Разбить по компонентам
function List({
   list,
   className,
   index,
}) {
   const dispatch = useDispatch()
   const { _id, title, cardItems } = list
   const [newCardMode, setNewCardMode] = useState(false)
   const lazyRef = useRef(null)
   // console.log('RENDERS', _id)

   useLazyLoading(lazyRef, () => dispatch(fetchCards(_id)))

   const onAddCardHandler = (listId, text) => {
      setNewCardMode(false)
      if (!text.length) return

      dispatch(createCard(listId, text))
   }

   return (
      <Draggable draggableId={_id} index={index}>
         {(provided, snapshot) => (
            <div
               {...provided.draggableProps}
               ref={provided.innerRef}
               className={clsx('List Scroll', className, {
                  'List--dragging': snapshot.isDragging,
               })}
            >
               <div className="List__header">
                  <div {...provided.dragHandleProps} className="List__title">{title}</div>

                  <ListOptionsDropDown _id={_id} />
               </div>

               <div className="List__body">
                  <Droppable droppableId={_id} type="card">
                     {(provided) => (
                        <div
                           {...provided.droppableProps}
                           ref={provided.innerRef}
                           className="List__cards"
                        >
                           {cardItems && cardItems.length
                              ? cardItems.map((card, index) => {
                                 return (
                                    <Card
                                       key={card._id}
                                       index={index}
                                       card={card}
                                       listId={_id}
                                       className="Board__list-card"
                                    />
                                 )
                              })
                              : null}
                           {provided.placeholder}

                           <div className="Lazy" ref={lazyRef}></div>
                        </div>
                     )}
                  </Droppable>

                  {newCardMode && (
                     <AddForm
                        callback={onAddCardHandler.bind(null, _id)}
                        placeholder="Название карточки"
                        className="List__addCardForm"
                     />
                  )}
                  {!newCardMode && (
                     <div
                        className="List__addCardBtn"
                        onClick={() => setNewCardMode(true)}
                     >
                        + Добавить карточку
                     </div>
                  )}
               </div>

            </div>
         )}
      </Draggable>
   )
}

export default memo(List)