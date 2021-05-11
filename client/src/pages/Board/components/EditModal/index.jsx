import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedCard } from '../../../../store/reducers/lists'

import { editCard } from '../../../../store/reducers/lists'
import Modal from '../../../../components/Modal'
import TitleInput from './components/TitleInput'
import Calendar from '../../../../components/Calendar'


const EditModal = () => {
	const dispatch = useDispatch()
	const { editedCard } = useSelector(state => state.lists)

	const closeModal = () => {
		dispatch(setEditedCard(null))
	}

	const changeCard = ({ prop, value }) => {
		editedCard[prop] !== value && dispatch(editCard({ listId: editedCard.listId, cardId: editedCard._id, prop, value }))
	}

	return editedCard ? (
		<div className="BoardPage__modal">
			<Modal 
				isVisible={editedCard}
				onClose={closeModal}
			>
				<TitleInput 
					title={editedCard.title}
					onBlur={changeCard}
				/>

				<Calendar />
			</Modal>
		</div>
	) : null
}

export default memo(EditModal)