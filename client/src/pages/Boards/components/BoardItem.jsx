import { Link } from 'react-router-dom'

import './BoardItem.sass'

export default function BoardItem({ _id, bg, title }) {
	return (
		<Link to={`/boards/${_id}`} className="BoardsPage__item">
			<div className="BoardsPage__item-bg">
				<img src={bg} alt="Board Img"/>
			</div>
			<div className="BoardsPage__item-title">{title}</div>
		</Link>
	)
}
