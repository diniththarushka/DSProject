import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

import Encrypt from '../tools/cypher'

export default class LoginComp extends Component {

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state={
            Email:'',
            Password:'',
        }

    }

    componentDidMount() {
        document.title="Login | Railway Management System";
    }

    onChangeEmail(e){
        this.setState({
            Email : e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            Password : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const GuestUser={
            Email : this.state.Email,
            Password : Encrypt(this.state.Password)
        };
        axios.post("http://localhost:4000/users/login",GuestUser).then(res =>
            {
                let resData=res.data;



                if(Object.keys(res.data).length){
                    sessionStorage.setItem('loggedIn','true');

                    sessionStorage.setItem('UserID',resData[0]._id);
                    sessionStorage.setItem('UserName',resData[0].Name);
                    sessionStorage.setItem('UserNIC',resData[0].NIC);
                    sessionStorage.setItem('UserPhone',resData[0].Phone);
                    sessionStorage.setItem('UserEmail',resData[0].Email);
                    sessionStorage.setItem('UserPassword',resData[0].Password);
                    sessionStorage.setItem('UserType',resData[0].Type);
                    sessionStorage.setItem('UserGovt',resData[0].Govt);

                    let{history} = this.props;
                    history.push({
                        pathname:'/',
                        state: {detail : res.data}
                    });
                    window.location.reload();

                }else{
                    alert("User not found. Please register");
                    let{history} = this.props;
                    history.push({
                        pathname:'/register'
                    });
                }
            });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="username@mail.com"
                            value={this.state.Email}
                            onChange={this.onChangeEmail}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.Password}
                            onChange={this.onChangePassword}
                            />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}