import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../../assets/images/logo.svg'

import Avatar from '../Avatar'

import './Header.sass'

const Header = () => {
	const { user } = useSelector(state => state.auth)
	
	return (
		<header className="Header">
			<div className="Header__left">
				<Link to="/">
					<img src={logo} alt="Kaban!"/>
				</Link>
			</div>

			<div className="Header__right">
				{user && <div className="header__user">
					{/* <div className="header__user-name">{user.fullname}</div> */}
					<Avatar 
						userName={user.fullname}
						url={user.avatar}
					/>
					{/* <div className="header__user-avatar">
						{ user.avatar && <img src={ user.avatar } alt="Avatar"/> }
					</div> */}
				</div>}
			</div>
		</header>
	)
}

export default Header
