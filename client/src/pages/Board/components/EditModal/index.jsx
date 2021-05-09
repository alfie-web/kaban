import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedCard } from '../../../../store/reducers/lists'

import Modal from '../../../../components/Modal'

const EditModal = () => {
	const dispatch = useDispatch()
	const { editedCard } = useSelector(state => state.lists)
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		setModalVisible(editedCard)
	}, [editedCard])

	const closeModal = () => {
		setModalVisible(false)
		dispatch(setEditedCard(null))
	}

	return modalVisible ? (
		<div className="BoardPage__modal">
			<Modal 
				isVisible={modalVisible}
				onClose={closeModal}
			>
				Modal content
			</Modal>
		</div>
	) : null
}

export default EditModal












// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { setEditedCard } from '../../../../store/reducers/lists'

// import Modal from '../../../../components/Modal'

// const EditModal = () => {
// 	const [modalVisible, setModalVisible] = useState(false)
// 	const { editedCard } = useSelector(state => state.lists)

// 	const closeModal = () => {
// 		setModalVisible(false)
// 		setEditedCard(null)
// 	}

// 	return editedCard ? (
// 		<div className="BoardPage__modal">
// 			{modalVisible && <Modal 
// 				isVisible={modalVisible}
// 				onClose={closeModal}
// 			>
// 				Modal content
// 			</Modal>}
// 		</div>
// 	) : null
// }

// export default EditModal
