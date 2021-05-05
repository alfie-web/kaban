import React from 'react'
import { useSelector } from 'react-redux'

import BoardItem from './BoardItem'

const BoardList = () => {
	const { items: boards } = useSelector(state => state.boards)

	return (
		<div className="BoardsPage__list">
			{boards.length 
				? boards.map(item => (
					<BoardItem 
						key={item._id}
						_id={item._id}
						title={item.title}
						bg={item.bg}
					/>
				))
			: null}
		</div>
	)
}

export default BoardList
