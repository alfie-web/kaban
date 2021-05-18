import { memo } from 'react'

const CardTitle = ({ title }) => {
	return <div className="Card__text">{title}</div>
}

export default memo(CardTitle)
