import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Particles from 'react-particles-js';

import './App.css';
import {BrowserRouter as Router,Route, Link} from "react-router-dom";
import logo from "./logo.png";
import Home from "./components/homepage.component";
import SignUpComp from "./components/signup.component";
import LoginComp from "./components/login.component";
import NavLoginBar from './components/navbar.component';
import MyAccount from './components/myaccount.component'
import Logout from './components/logout.component';


function App(){
    return (

        <Router>
                <div id="particles-js">
                <Particles/>
                </div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="http://www.railway.gov.lk/web/" target="_blank" rel="noopener noreferrer">
                        <img src={logo} width="30" height="30" alt="Sri Lanka Railways"/>
                    </a>
                    <Link to="/" className="navbar-brand">Railway Management System</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <NavLoginBar isLogged={false}/>
                        </ul>
                    </div>
                </nav>
                <br/>

                <Route path="/" exact component={Home} />
                <Route path="/register" component={SignUpComp} />
                <Route path="/login" component={LoginComp} />
                <Route path="/myAccount/Logout" component={Logout}/>
                <Route path="/myAccount" component={MyAccount}/>
            </div>

        </Router>
  );
}

export default App;
