import React,{Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Encrypt from "../tools/cypher";


export default class SignUpComp extends Component{

    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserNIC = this.onChangeUserNIC.bind(this);
        this.onChangeUserPhone = this.onChangeUserPhone.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onChangeUserConfirmPassword = this.onChangeUserConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name : '',
            NIC : '',
            Phone : '',
            Email : '',
            Password : '',
            ConfirmPassword:''
        }
    }

    componentDidMount() {
        document.title="Register | Railway Management System";
    }

    onChangeUserName(e){
        this.setState({
            Name : e.target.value
        });
    }

    onChangeUserNIC(e){
        this.setState({
           NIC : e.target.value
        });
    }

    onChangeUserPhone(e){
        this.setState({
           Phone : e.target.value
        });
    }

    onChangeUserEmail(e){
        this.setState({
            Email : e.target.value
        });
    }

    onChangeUserPassword(e) {
        this.setState({
            Password : e.target.value
        });
    }

    onChangeUserConfirmPassword(e) {
        this.setState({
            ConfirmPassword : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.Password === this.state.ConfirmPassword){

            const newUser={
                Name : this.state.Name,
                NIC : this.state.NIC,
                Phone : this.state.Phone,
                Email : this.state.Email,
                Password : Encrypt(this.state.Password),
                Govt : 'false'
            };

            axios.post('http://localhost:4000/users/add', newUser)
                .then(res =>
                {
                    if(res.data.userStatus === 'unsuccessful'){

                        this.state = {
                            Name : '',
                            NIC : '',
                            Phone : '',
                            Email : '',
                            Password : '',
                            Govt : 'false'
                        };
                        alert("Registration Failed. Email is already used.");
                    }else{
                        this.state = {
                            Name : '',
                            NIC : '',
                            Phone : '',
                            Email : '',
                            Password : '',
                            Govt : 'false'
                        };

                        alert("Registration Successful. Proceed Login");
                        let{history} = this.props;
                        history.push({
                            pathname:'/login',
                        });
                    }
                });
        }else
        SignUpComp.passwordWrong();
    }

    static passwordWrong(){
    alert("Please Check the Passwords. Try again");
    }

    render(){
        return(
            <div style={{marginTop: 10}}>
                <h3 align="center">Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name : </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={this.state.Name}
                            onChange={this.onChangeUserName}
                        />
                    </div>
                    <div className="form-group">
                        <label>NIC : </label>
                        <input
                            type="text"
                            placeholder="XXXXXXXXXXV"
                            className="form-control"
                            value={this.state.NIC}
                            onChange={this.onChangeUserNIC}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone : </label>
                        <input
                            type="text"
                            placeholder="071XXXXXXX"
                            className="form-control"
                            value={this.state.Phone}
                            onChange={this.onChangeUserPhone}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email : </label>
                        <input
                            type="email"
                            placeholder="usermail@mail.com"
                            className="form-control"
                            value={this.state.Email}
                            onChange={this.onChangeUserEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangeUserPassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password : </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control"
                            value={this.state.ConfirmPassword}
                            onChange={this.onChangeUserConfirmPassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="RegisterUser" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        );
    }
}