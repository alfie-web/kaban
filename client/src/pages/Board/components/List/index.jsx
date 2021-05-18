import React, { useRef, memo } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { fetchCards } from '../../../../store/reducers/lists'
import useLazyLoading from '../../../../helpers/useLazyLoading'

import AddCardForm from './components/AddCardForm'
import ListOptionsDropdown from './components/OptionsDropdown'
import ListPreloader from './components/Preloader'
import './List.sass'

import ListCards from './components/Cards'

function List({
   list,
   className,
   index,
}) {
   const dispatch = useDispatch()
   const { _id, title, cardItems } = list
   const lazyRef = useRef(null)

   // TODO: Вынести в компонент Lazy вместе в ref'ом
   useLazyLoading(lazyRef, () => dispatch(fetchCards(_id)))

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

                  <ListOptionsDropdown listId={_id} />
               </div>

               <div className="List__body">
                  <Droppable droppableId={_id} type="card">
                     {(provided) => (
                        <div
                           {...provided.droppableProps}
                           ref={provided.innerRef}
                           className="List__cards"
                        >
                           <ListCards 
                              cardItems={cardItems}
                              listId={_id}
                           />
                           {provided.placeholder}

                           <ListPreloader listId={_id} />

                           <div className="Lazy" ref={lazyRef}></div>
                        </div>
                     )}
                  </Droppable>

                  <AddCardForm listId={_id} />
               </div>
            </div>
         )}
      </Draggable>
   )
}

export default memo(List)