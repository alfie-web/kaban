import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginForm from './components/LoginForm'

import './Auth.sass'

const AuthPage = () => {
	const { isAuth } = useSelector(state => state.auth)

   if (isAuth) return <Redirect to="/boards" />

   return (
      <div className="Page Auth">
         <div className="container">
            <Switch>
               <Route exact path={['/', '/login']} component={LoginForm} />
            </Switch>

            <ul className="Auth__info">
               <li>Данные для авторизации:</li>
               <li> E-mail: user1@mail.ru</li>
               <li> Пароль: 123qweQWE</li>
            </ul>
         </div>
      </div>
   )
}

export default AuthPage
