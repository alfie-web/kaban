import { useSelector } from 'react-redux'

const BoardBg = () => {
	const currentBoard = useSelector(state => state.boards.currentBoard)

   return (
      <div className="BoardPage__bg">
         {currentBoard 
				? <img src={currentBoard.bg} alt="Board bg" /> 
				: null
			}
      </div>
   )
}

export default BoardBg