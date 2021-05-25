import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchBoards } from '../../store/reducers/boards'
import BoardList from './components/BoardList'

import './Boards.sass'

const Boards = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fetchBoards())
   }, [dispatch])

   return (
      <main className="BoardsPage page">
         <div className="container">
            <h1>Ваши доски</h1>

            <BoardList />
         </div>
      </main>
   )
}

export default Boards
