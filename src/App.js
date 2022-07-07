import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Admin from './views/Admin'
import Logout from './components/auth/Logout'
import Auth from './views/Auth'
import Homepage from './views/Homepage'
import Landing from './views/Landing'
import Teacher from './views/Teacher'

import ProtectedRoute from './components/routing/ProtectedRoute'
import AdminRoute from './components/routing/AdminRoute'
import TeacherRoute from './components/routing/TeacherRoute'

import AuthContextProvider from './contexts/authContext'
import DataContextProvider from './contexts/dataContext'
import UserContextProvider from './contexts/userContext'

import Question from './views/Question'
import Task from './views/Task'
import Thematic from './views/Thematic'
import Lesson from './views/Lesson'
import Contest from './views/Contest'
import PublicRoute from './components/routing/PublicRoute'
import NotFound from './views/NotFound'

import Test from './views/test'
import CustomFormat from './views/CustomFormat'

function App() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <UserContextProvider>
          <Router>
            <Switch>
              <Route exact path='/login' render= {props => <Auth {...props} authRoute='login' />} />
              <Route exact path='/register' render= {props => <Auth {...props} authRoute='register' />} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/' component={Homepage} />
              <Route path='/landing' component={Landing} />
              <Route exact path='/404' component={NotFound} />
              <AdminRoute path='/admin/:action' component={Admin} />
              <AdminRoute path='/admin' component={Admin} />
              <TeacherRoute path='/teacher/:action/add' component={Teacher} />
              <TeacherRoute path='/teacher/:action' component={Teacher} />
              <TeacherRoute path='/teacher' component={Teacher} />
              <PublicRoute exact path='/questions' list='true' component={Question} />
              <PublicRoute path='/question/:_id' component={Question} />
              <PublicRoute path='/tasks' component={Task} />
              <PublicRoute path='/task/:tag' component={Task} />
              <PublicRoute exact path='/thematics' list='true' component={Thematic} />
              <PublicRoute path='/thematic/:tag' component={Thematic} />
              <PublicRoute path='/lesson/:tag' component={Lesson} />
              <PublicRoute exact path='/lessons' component={Lesson} />
              <ProtectedRoute path='/contest/new' component={Contest} />
              <ProtectedRoute path='/contest/:tagor_id/explanation' component={Contest} />
              <ProtectedRoute path='/contest/:tagor_id/print' component={Contest} />
              <ProtectedRoute path='/contest/:tagor_id' component={Contest} />
              <ProtectedRoute path='/customformat' component={CustomFormat} />

              <Route path='/test' component={Test} />
            </Switch>
          </Router>
        </UserContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  )
}

export default App