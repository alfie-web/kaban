import { useState, memo } from 'react'
import { useDispatch } from 'react-redux'

import { createCard } from '../../../../../../store/reducers/lists'
import AddForm from '../../../AddForm'

const AddCardForm = ({ listId }) => {
   const dispatch = useDispatch()
   const [newCardMode, setNewCardMode] = useState(false)

   const onNewCardMode = () => setNewCardMode(true)

   const addCardHandler = (text) => {
      setNewCardMode(false)
      if (!text.length) return

      dispatch(createCard(listId, text))
   }

   return (
      <>
         {newCardMode && (
            <AddForm
               callback={addCardHandler}
               placeholder="Название карточки"
               className="List__addCardForm"
            />
         )}
         {!newCardMode && (
            <div className="List__addCardBtn" onClick={onNewCardMode}>
               + Добавить карточку
            </div>
         )}
      </>
   )
}

export default memo(AddCardForm)
