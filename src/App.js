import React from 'react';
import { Dashboard, Login, AuthWrapper, Error } from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return isUser ? <Dashboard /> : <Redirect to='/login'></Redirect>;
            }}
          />
          <Route path='/login' component={Login} />
          <Route path='*' component={Error} />
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
