import { memo } from 'react'

const CardDescription = ({ description }) => {
	return description ? (
		<div className="Card__info">
			<svg
				width="16"
				height="14"
				viewBox="0 0 16 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 9H12.5M1 5H15M1 1H12.5M1 13H15"
					stroke="#8DA4B9"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	) : null
}

export default memo(CardDescription)
