import { Switch, Route, Redirect } from 'react-router-dom'

const App = () => {
   return <div className="App">
      Kaban

      <Switch>
         <Route exact path={['/signin', '/signup']} component={() => <div>Auth</div>} />
         <Redirect from="*" to="/" />
      </Switch>
   </div>
}

export default App
