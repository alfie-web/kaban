import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../store/reducers/auth'
import Avatar from '../Avatar'
import DropDown from '../DropDown'
import logo from '../../assets/images/logo.svg'

import './Header.sass'

const HeaderUser = () => {
   const [isVisible, setIsVisible] = useState(false)
   const dispatch = useDispatch()
   const user = useSelector((state) => state.auth.user)

   const onShow = () => setIsVisible(true)
   const onClose = () => setIsVisible(false)
   const logoutHandler = () => dispatch(logout())

   return user ? (
      <div className="Header__user">
         <div onClick={onShow}>
            <Avatar userName={user.fullname} url={user.avatar} />
         </div>

         <DropDown isVisible={isVisible} onClose={onClose}>
            <div className="Link" onClick={logoutHandler}>
               Выйти из аккаунта
            </div>
         </DropDown>
      </div>
   ) : null
}

const Header = () => {
   return (
      <header className="Header">
         <div className="Header__left">
            <Link to="/">
               <img src={logo} alt="Kaban!" />
            </Link>
         </div>

         <div className="Header__right">
            <HeaderUser />
         </div>
      </header>
   )
}

export default Header
