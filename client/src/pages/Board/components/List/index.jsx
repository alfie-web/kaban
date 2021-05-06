import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import Card from '../Card'
import AddForm from '../AddForm'
import './List.sass'

function List({
   list,
   className,
   index,
   createCard,
   editCard,
   deleteCard,
   getAllCards,
}) {
   const dispatch = useDispatch()
   const { _id, title, cardItems } = list
   const [newCardMode, setNewCardMode] = useState(false)

   useEffect(() => {
      dispatch(getAllCards(_id))
   }, [dispatch, getAllCards, _id])

   const onAddCardHandler = (listId, text) => {
      setNewCardMode(false)
      if (!text.length) return

      dispatch(createCard(listId, text))
   }

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
                        >
                           {cardItems && cardItems.length
                              ? cardItems.map((card, index) => {
                                 return (
                                    <Card
                                       key={card._id}
                                       index={index}
                                       card={card}
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
                        </div>
                     )}
                  </Droppable>

                  {newCardMode && (
                     <AddForm
                        callback={onAddCardHandler.bind(null, _id)}
                        placeholder="Текст карточки"
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

export default List














// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import clsx from 'clsx'
// import { Droppable, Draggable } from 'react-beautiful-dnd'

// import Card from '../Card'
// import AddForm from '../AddForm'
// import './List.sass'

// function List({
//    list,
//    className,
//    index,
//    createCard,
//    editCard,
//    deleteCard,
//    getAllCards,
// }) {
//    const dispatch = useDispatch()
//    const { _id, title, cardItems } = list
//    const [newCardMode, setNewCardMode] = useState(false)

//    useEffect(() => {
//       dispatch(getAllCards(_id))
//    }, [dispatch, getAllCards, _id])

//    const onAddCardHandler = (listId, text) => {
//       setNewCardMode(false)
//       if (!text.length) return

//       dispatch(createCard(listId, text))
//    }

//    // const onEditCardHandler = (listId, cardId, text) => {
//    //    if (!text.length) return

//    //    editCard(listId, cardId, text)
//    // }

//    // const onDeleteCardHandler = (listId, cardId) => {
//    //    deleteCard({ listId, cardId })
//    // }

//    return (
//       <Draggable draggableId={_id} index={index}>
//          {(provided, snapshot) => (
//             <div
//                {...provided.draggableProps}
//                ref={provided.innerRef}
//                className={clsx('List', className, {
//                   'List--dragging': snapshot.isDragging,
//                })}
//             >
//                <div {...provided.dragHandleProps} className="List__header">
//                   <div className="List__title">{title}</div>
//                </div>

//                <Droppable droppableId={_id} type="card">
//                   {(provided) => (
//                      <div
//                         {...provided.droppableProps}
//                         ref={provided.innerRef}
//                         className="List__cards"
//                      >
//                         {cardItems && cardItems.length
//                            ? cardItems.map((card, index) => {
//                                 return (
//                                    <Card
//                                       key={card._id}
//                                       index={index}
//                                       card={card}
//                                       className="Board__list-card"
//                                     //   onEditCardHandler={onEditCardHandler.bind(
//                                     //      null,
//                                     //      _id
//                                     //   )}
//                                     //   onDeleteCardHandler={onDeleteCardHandler.bind(
//                                     //      null,
//                                     //      _id
//                                     //   )}
//                                    />
//                                 )
//                              })
//                            : null}
//                         {provided.placeholder}
//                      </div>
//                   )}
//                </Droppable>

//                {newCardMode && (
//                   <AddForm
//                      callback={onAddCardHandler.bind(null, _id)}
//                      placeholder="Текст карточки"
//                   />
//                )}
//                {!newCardMode && (
//                   <div
//                      className="List__addCardBtn"
//                      onClick={() => setNewCardMode(true)}
//                   >
//                      + Добавить карточку
//                   </div>
//                )}
//             </div>
//          )}
//       </Draggable>
//    )
// }

// export default List
