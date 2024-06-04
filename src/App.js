import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from './Components/Home'
import NotFoundView from './Components/common/NotFoundView'
// import ProtectedRoute from "./Components/ProtectedRoute";
import ProfilePage from './Components/ProfilePage'
import Repositories from './Components/Repository'
import RepositoryItemPage from './Components/RepositoryItemPage'
import Analysis from './Components/Analysis'
import './styles.css'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:user/profile" component={ProfilePage} />
        <Route exact path="/:user/repositories" component={Repositories} />
        <Route
          exact
          path="/:user/repository/:repositoryName"
          component={RepositoryItemPage}
        />
        <Route exact path="/:user/analysis" component={Analysis} />
        <Route component={NotFoundView} />
      </Switch>
    </BrowserRouter>
  )
}
