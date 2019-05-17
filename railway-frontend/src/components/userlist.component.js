import React,{Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import ModUser from "./modifyuser.component";
import deleteUser from "./delete.user.component";


const User = props => (
    <tr>
        <td>{props.user.Name}</td>
        <td>{props.user.NIC}</td>
        <td>{props.user.Phone}</td>
        <td>{props.user.Email}</td>
        <td>{props.user.Password}</td>
        <td>
            <Link className="btn btn-primary" to={"/modify/"+props.user._id}>Modify</Link>
        </td>
        <td>
            <Link className="btn btn-danger" to={"/users/delete/"+props.user._id}>Delete</Link>
        </td>
    </tr>
);

export default class UserList extends Component {


    componentDidMount() {
        document.title="Users(Admin) | Railway Management System";
        axios.get('http://localhost:4000/users/')
            .then(response => {
                this.setState({ Users: response.data });

            })
            .catch(function (error){
                console.log(error);
            })
    }



    userList() {
        return this.state.Users.map(function(currentUser, i){
            return <User user={currentUser} key={i} />;
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            Users : []
        };
    }
    render() {
        return (
            <Router>
            <div>
                <h3 align="center">Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>NIC</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.userList() }
                    </tbody>
                </table>
            </div>
                <Route path="/modify/" render={(routeProps) => (
                    <ModUser {...routeProps} User={this.props}/>
                )}/>
                <Route path="/users/delete" component={deleteUser}/>
            </Router>
        );
    }

}