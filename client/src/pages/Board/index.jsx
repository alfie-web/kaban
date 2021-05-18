import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { fetchBoardById, moveList } from '../../store/reducers/boards'
import { moveCard, setEditedCard } from '../../store/reducers/lists'

import BoardLists from './components/Lists'
import BoardBg from './components/Bg'
import BoardTitle from './components/Title'
import AddListForm from './components/AddListForm'
import EditModal from './components/EditModal'
import './Board.sass'

const Board = () => {
	const { id } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		id && dispatch(fetchBoardById(id))
	}, [id, dispatch])

	const onDragEnd = (result) => {
      const { destination, source, draggableId, type } = result

      if (!destination) return
      if (
         destination.droppableId === source.droppableId &&
         destination.index === source.index
      )
         return

      if (type === 'list') {
         // логика сортировки листов
         dispatch(moveList({
            boardId: id,
            listId: draggableId,
            currentPosition: source.index,
            newPosition: destination.index,
         }))
      } else if (type === 'card') {
         dispatch(moveCard({
            startListId: source.droppableId, // id листа из которого перемещаем карточку
            cardId: draggableId, // id перемещаемой карточки
            endListId: destination.droppableId, // id листа в который перемещаем карточку
            currentPosition: source.index, // индекс текущей перемещаемой карточки
            newPosition: destination.index, // индекс новой позиции в массиве
         }))
      }
   }

   const cardClickHandler = e => {  
      const card = e.target.closest('.Card')
      if (!card) return

      dispatch(setEditedCard({
         listId: card.dataset.listid,
         cardId: card.dataset.id
      }))
   }

	return (
      <>
         <BoardBg />

         <main className="BoardPage page">
            <BoardTitle />
            
            <div className="BoardPage__container">
               <DragDropContext onDragEnd={onDragEnd}>
                  <div className="BoardPage__lists" onDoubleClick={cardClickHandler}>
                     <Droppable
                        droppableId="all-lists"
                        direction="horizontal"
                        type="list"
                     >
                        {(provided) => (
                           <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="BoardPage__lists-items"
                           >
                              <BoardLists />
                              {provided.placeholder}

                              <AddListForm />
                           </div>
                        )}
                     </Droppable>
                  </div>
               </DragDropContext>
            </div>

            <EditModal />
         </main>
      </>
   )
}

export default Board