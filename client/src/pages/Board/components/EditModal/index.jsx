import { useState, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedCard } from '../../../../store/reducers/lists'

import { editCard } from '../../../../store/reducers/lists'
import Modal from '../../../../components/Modal'
import TitleInput from './components/TitleInput'


const EditModal = () => {
	const dispatch = useDispatch()
	const { editedCard } = useSelector(state => state.lists)
	// const [formData, setFormData] = useState(editedCard)

	// useEffect(() => {
	// 	setFormData(editedCard)
	// }, [editedCard])

	const closeModal = () => {
		// setFormData(false)
		dispatch(setEditedCard(null))
	}

	// const changeFormData = (prop, value) => {
	// 	setFormData(prev => ({
	// 		...prev,
	// 		[prop]: value
	// 	}))
	// }

	const changeCard = ({ prop, value }) => {
		// console.log({ listId: editedCard.listId, cardId: editedCard._id, prop, value })
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
					// changeFormData={changeFormData}
					onBlur={changeCard}
				/>
			</Modal>
		</div>
	) : null
}

export default memo(EditModal)























// import { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { setEditedCard } from '../../../../store/reducers/lists'

// import Modal from '../../../../components/Modal'
// import TitleInput from './components/TitleInput'


// const EditModal = () => {
// 	const dispatch = useDispatch()
// 	const { editedCard } = useSelector(state => state.lists)
// 	const [formData, setFormData] = useState(editedCard)

// 	useEffect(() => {
// 		setFormData(editedCard)
// 	}, [editedCard])

// 	const closeModal = () => {
// 		setFormData(false)
// 		dispatch(setEditedCard(null))
// 	}

// 	const changeFormData = (prop, value) => {
// 		setFormData(prev => ({
// 			...prev,
// 			[prop]: value
// 		}))
// 	}

// 	const changeCard = () => {
// 		// запрос на изменение (передаю formData)
// 		console.log(formData)
// 	}

// 	return formData ? (
// 		<div className="BoardPage__modal">
// 			<Modal 
// 				isVisible={formData}
// 				onClose={closeModal}
// 			>
// 				<TitleInput 
// 					title={formData.title}
// 					changeFormData={changeFormData}
// 					onBlur={changeCard}
// 				/>
// 			</Modal>
// 		</div>
// 	) : null
// }

// export default EditModal