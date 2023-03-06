// styles
import './App.css'

// route components
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

// context
import { useAuthContext } from './hooks/useAuthContext'
import OnlineUsersSidebar from './components/OnlineUsersSidebar'


function App() {

  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>

        {user && (<Sidebar />)}

          <div className="container">
            <Navbar />
            
            <Switch>

              <Route exact path="/">
                {user && <Dashboard />}
                {!user && <Redirect to="/login" />}
              </Route>

              <Route path="/create">
                {user && <Create />}
                {!user && <Redirect to="/login" />}
              </Route>

              <Route path="/projects/:id">
                {user && <Project />}
                {!user && <Redirect to="/login" />}
                
              </Route>

              <Route path="/login">
                {!user && <Login />}
                {user && <Redirect to="/" />}
              </Route>

              <Route path="/signup">
                {!user && <Signup />}
                {user && <Redirect to="/" />}
              </Route>

            </Switch>

          </div>

          {user && (<OnlineUsersSidebar />)}

        </BrowserRouter>
      )}
    </div>
  );
}

export default App
