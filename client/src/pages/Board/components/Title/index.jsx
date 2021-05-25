import { useSelector } from 'react-redux'

const BoardTitle = () => {
   const currentBoard = useSelector((state) => state.boards.currentBoard)

   return currentBoard ? (
      <h2 className="BoardPage__title">{currentBoard && currentBoard.title}</h2>
   ) : null
}

export default BoardTitle
