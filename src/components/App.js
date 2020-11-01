/** @format */
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Logout from './Logout';
import { makeStyles } from '@material-ui/core';
import Dashboard from '../routes/dashboard';
import Surveys from '../routes/surveys';

const useStyles = makeStyles({
  contentWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <NavBar />
      <div className={classes.contentWrap}>
        <Route exact path="/">
          <Surveys />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Switch>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
