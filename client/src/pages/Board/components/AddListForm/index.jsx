import { memo, useState } from "react"
import { useDispatch } from 'react-redux'

import { createList } from '../../../../store/reducers/lists'
import AddForm from '../AddForm'

const AddListForm = ({ boardId }) => {
   const dispatch = useDispatch()
   const [newListMode, setNewListMode] = useState(false)

   const scrollToRight = () => {
		window.scrollTo({
			left: window.innerWidth,
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

		dispatch(createList(boardId, title))
	}

   return <>
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
   </>
}

export default memo(AddListForm)