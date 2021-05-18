import { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import eventEmitter from './helpers/eventEmitter'
import { init } from './store/reducers/app'

import Flash from './components/Flash'
import Header from './components/Header'
import AuthPage from './pages/Auth'
import BoardsPage from './pages/Boards'
import BoardPage from './pages/Board'
import Preloader from './components/Preloader'

window.flash = (message, type = 'success', position = 'top-right') =>
   eventEmitter.emit('flash', { message, type, position })

const ROUTES = [
   { path: '/', component: AuthPage },
   { path: '/boards', component: BoardsPage, auth: true },
   { path: '/boards/:id', component: BoardPage, auth: true },
]

const Routes = ({ routes }) => {
   const { isAuth } = useSelector(state => state.auth)

   return (
      <Switch>
         {routes.map(
            (route, i) =>
               (route.auth === isAuth || !route.hasOwnProperty('auth')) && (
                  <Route
                     key={i}
                     exact
                     path={route.path}
                     component={route.component}
                  />
               )
         )}
         <Redirect from="*" to="/" />
      </Switch>
   )
}

const App = () => {
   const dispatch = useDispatch()
   const { initialized } = useSelector(state => state.app)
   
   useEffect(() => {
      dispatch(init())
   }, [dispatch])
      
   if (!initialized) return <Preloader />

   return (
      <>
         <Flash />

         <div className="App">
            <Header />

            <Routes 
               routes={ROUTES}
            />
         </div>
      </>
   )
}

export default App
