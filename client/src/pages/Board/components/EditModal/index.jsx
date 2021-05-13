import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedCard } from '../../../../store/reducers/lists'

import { editCard } from '../../../../store/reducers/lists'
import Modal from '../../../../components/Modal'
import TitleInput from './components/TitleInput'
import DatePicker from './components/DatePicker'
import TimePicker from './components/TimePicker'
import Marks from './components/Marks'



import './EditModal.sass'

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

				<div className="EditModal__row">
					<DatePicker 
						date={editedCard.date}
						onChange={changeCard}
					/>

					<TimePicker 
						time={editedCard.time}
						onChange={changeCard}
					/>
				</div>

				<div className="EditModal__row">
					<Marks 
						marks={editedCard.marks}
						onChange={changeCard}
					/>
				</div>
			</Modal>
		</div>
	) : null
}

export default memo(EditModal)