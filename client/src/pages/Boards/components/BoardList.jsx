import React from 'react'
import { useSelector } from 'react-redux'

import Preloader from '../../../components/Preloader'
import BoardItem from './BoardItem'

const BoardPreloader = () => {
	const isFetching = useSelector(state => state.boards.isFetching)
	return <Preloader isVisible={isFetching} />
}

const BoardList = () => {
	const items = useSelector(state => state.boards.items)
	

	return (
		<div className="BoardsPage__list">
			{items.length 
				? items.map(item => (
					<BoardItem 
						key={item._id}
						_id={item._id}
						title={item.title}
						bg={item.bg}
					/>
				))
			: null}
			<BoardPreloader />
		</div>
	)
}

export default BoardList
