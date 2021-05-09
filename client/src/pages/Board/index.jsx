import { useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { fetchBoardById, moveList } from '../../store/reducers/boards'
import { fetchCards, createList, createCard, moveCard, setLists } from '../../store/reducers/lists'

import List from './components/List'
import AddForm from './components/AddForm'
import './Board.sass'

const Board = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const listsRef = useRef(null)
	const [newListMode, setNewListMode] = useState(false)
	const { currentBoard } = useSelector(state => state.boards)
	const { items } = useSelector(state => state.lists)

	useEffect(() => {
		id && dispatch(fetchBoardById(id))
	}, [id, dispatch])

   // useEffect(() => {
   //    document.documentElement.style.overflowY = 'hidden'
   //    return () => {
   //       document.documentElement.style.overflowY = 'auto'
   //    }
   // })

   // useEffect(() => {
   //    return () => {
   //       dispatch(setLists([]))
   //    }
   // }, [dispatch])

	const scrollToRight = () => {
		window.scrollTo({
			left: listsRef.current.clientWidth,
			behavior: 'smooth',
		})
	}

	const onNewListMode = () => {
		scrollToRight()
		setNewListMode(true)
	}

	const onAddListHandler = (title) => {
		setNewListMode(false)
		if (!title.length) return

		dispatch(createList(id, title))
	}


	const onDragEnd = (result) => {
      const { destination, source, draggableId, type } = result

      if (!destination) return
      if (
         destination.droppableId === source.droppableId &&
         destination.index === source.index
      )
         return

      if (type === 'list') {
         // логика для сортировки листов
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

	return (
      <DragDropContext onDragEnd={onDragEnd}>
         <>
            <div className="BoardPage__bg">
               {currentBoard && <img src={currentBoard.bg} alt="Board bg" />}
            </div>

            <main className="BoardPage page">
               <h2 className="BoardPage__title">{currentBoard && currentBoard.title}</h2>
               <div className="BoardPage__container">

                  <div className="BoardPage__lists" ref={listsRef}>
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
                              {items && items.length
                                 ? items.map((list, index) => (
                                      <List
                                         key={list._id}
                                         index={index}
                                         className="BoardPage__list"
                                         list={list}
                                       //   getAllCards={fetchCards}
                                       //   createCard={createCard}
                                       //   editCard={editCard}
                                       //   deleteCard={deleteCard}
                                      />
                                   ))
                                 : null}
                              {provided.placeholder}

                              {!newListMode && (
                                 <div
                                    className="List__addListBtn"
                                    onClick={onNewListMode}
                                 >
                                    + Добавить лист
                                 </div>
                              )}
                              {newListMode && (
                                 <div className="BoardPage__addList">
                                    <AddForm
                                       callback={onAddListHandler}
                                       placeholder="Название листа"
                                    />
                                 </div>
                              )}
                           </div>
                        )}
                     </Droppable>

                     {/* {!newListMode && (
                        <div
                           className="List__addListBtn"
                           onClick={onNewListMode}
                        >
                           + Добавить лист
                        </div>
                     )}
                     {newListMode && (
                        <div className="BoardPage__addList">
                           <AddForm
                              callback={onAddListHandler}
                              placeholder="Заголовок листа"
                           />
                        </div>
                     )} */}
                  </div>
               </div>
            </main>
         </>
      </DragDropContext>
   )
}

export default Board
