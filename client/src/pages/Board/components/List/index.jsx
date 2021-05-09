import React, { useState, useRef, memo } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { fetchCards, createCard, setEditedCard } from '../../../../store/reducers/lists'
import useLazyLoading from '../../../../helpers/useLazyLoading'

import Card from '../Card'
import AddForm from '../AddForm'
import './List.sass'

function List({
   list,
   className,
   index,
}) {
   const dispatch = useDispatch()
   const { _id, title, cardItems } = list
   const [newCardMode, setNewCardMode] = useState(false)
   // const isCardsFetching = useSelector(state => state.lists.isCardsFetching)
   const lazyRef = useRef(null)

   console.log('RENDERS', _id)

   // console.log(isCardsFetching)
   // useEffect(() => {
   //    // dispatch(getAllCards(_id))
   //    dispatch(fetchCards(_id))
   // }, [dispatch, _id])

   useLazyLoading(lazyRef, () => dispatch(fetchCards(_id)))
   // useLazyLoading(lazyRef, () => dispatch(fetchCards(_id)), isCardsFetching)
   // useLazyLoading(lazyRef, () => {}, isCardsFetching)

   const onAddCardHandler = (listId, text) => {
      setNewCardMode(false)
      if (!text.length) return

      dispatch(createCard(listId, text))
   }

   // const cardClickHandler = e => {     // Можно его и на контейнер листов повесить
   //    const card = e.target.closest('.Card')
   //    if (!card) return

   //    dispatch(setEditedCard({
   //       listId: _id,
   //       cardId: card.dataset.id
   //    }))
   // }

   // const onEditCardHandler = (listId, cardId, text) => {
   //    if (!text.length) return

   //    editCard(listId, cardId, text)
   // }

   // const onDeleteCardHandler = (listId, cardId) => {
   //    deleteCard({ listId, cardId })
   // }

   return (
      <Draggable draggableId={_id} index={index}>
         {(provided, snapshot) => (
            <div
               {...provided.draggableProps}
               ref={provided.innerRef}
               className={clsx('List', className, {
                  'List--dragging': snapshot.isDragging,
               })}
            >
               <div {...provided.dragHandleProps} className="List__header">
                  <div className="List__title">{title}</div>
               </div>

               <div className="List__body">
                  <Droppable droppableId={_id} type="card">
                     {(provided) => (
                        <div
                           {...provided.droppableProps}
                           ref={provided.innerRef}
                           className="List__cards"
                           // onDoubleClick={cardClickHandler}
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
                                       //   onEditCardHandler={onEditCardHandler.bind(
                                       //      null,
                                       //      _id
                                       //   )}
                                       //   onDeleteCardHandler={onDeleteCardHandler.bind(
                                       //      null,
                                       //      _id
                                       //   )}
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