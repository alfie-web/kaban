import { memo } from 'react'
import clsx from 'clsx'
import { Draggable } from 'react-beautiful-dnd'

import CardMarks from './components/Marks'
import CardsDate from './components/Date'
import CardDescription from './components/Description'
import CardResponsibleUsers from './components/ResponsibleUsers'
import CardTitle from './components/Title'

import './Card.sass'

function Card({
   card,
   className,
   index,
   listId
}) {
   console.log('RENDERS')
   const { _id, title, marks, date, time, responsibleUsers, description } = card

   return (
      <Draggable draggableId={_id} index={index}>
         {(provided, snapshot) => (
            <div
               {...provided.draggableProps}
               {...provided.dragHandleProps} // Эта штука отвечает за зону за которую можно потянуть. Если хочется тянуть например только за заголовок, нужно передать эти пропсы туда
               ref={provided.innerRef}
               className={clsx('Card', className, {
                  'Card--dragging': snapshot.isDragging,
               })}
               data-id={_id}
               data-listid={listId}
            >
               <CardMarks marks={marks} />

               <CardTitle title={title} />

               <div className="Card__bottom">
                  <div className="Card__bottom-left">
                     <CardsDate date={date} time={time} />
                     
                     <CardDescription description={description} />
                  </div>

                  <div className="Card__bottom-right">
                     <CardResponsibleUsers responsibleUsers={responsibleUsers} />
                  </div>
               </div>
            </div>
         )}
      </Draggable>
   )
}

export default memo(Card)