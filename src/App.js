import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route path="/project/:id" component={ProjectDetails}/>
          <Route path = "/signin" component={SignIn}></Route>
          <Route path = "/signup" component={SignUp}></Route>
          <Route path = "/create" component={CreateProject}></Route>
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
