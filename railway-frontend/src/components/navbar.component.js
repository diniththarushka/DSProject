import React,{Component} from 'react';

import {Link} from "react-router-dom";
export default class NavLoginBar extends Component{


    render() {

        let un=sessionStorage.getItem('loggedIn');;
        if(un === 'true'){
            return(
                <div>
                <li className="navbar-item">
                    <Link to="/myAccount" className="nav-link">My Account</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/myAccount/Logout" className="nav-link">Logout</Link>
                </li>
                </div>
            );
        }else{
            return(
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            );
        }

    }
}