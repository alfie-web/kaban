import { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { init } from './store/reducers/app'

import AuthPage from './pages/Auth'
import BoardsPage from './pages/Boards'
import BoardPage from './pages/Board'
import Header from './components/Header'

const ROUTES = [
   { path: '/', component: AuthPage, auth: 'all' },
   { path: '/boards', component: BoardsPage, auth: true },
   { path: '/boards/:id', component: BoardPage, auth: true },
]

function createRoutes(isAuth) {
   return (
      <Switch>
         {ROUTES.map(
            (route, i) =>
               (route.auth === isAuth || route.auth === 'all') && (
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
   const { isAuth } = useSelector(state => state.auth)

   useEffect(() => {
      dispatch(init())
   }, [dispatch])
   // }, [initialized, dispatch])
      
   if (!initialized) return <div>Loading...</div>

   return <div className="App">
      <Header />

      {createRoutes(isAuth)}

      {/* <Switch>
         

         <Route exact path={['/signin', '/signup']} component={() => <div>Auth</div>} />
         <Route exact path="/boards" component={() => <div>Boards</div>} />
         <Redirect from="*" to="/" />
      </Switch> */}
   </div>
}

export default App
