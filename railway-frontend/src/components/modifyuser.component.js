import React,{Component} from 'react';
import scrollToComponent from 'react-scroll-to-component';
import axios from 'axios';

export default class ModUser extends Component{

        componentWillMount() {
            this.unlisten = this.props.history.listen((location, action) => {
                console.log("on route change");

                if(this.props.location.pathname){
                    let urlStr = this.props.location.pathname;
                    let userID = (urlStr.split('/')[2]);
                    console.log(userID);
                    scrollToComponent(this.appDiv);
                    axios.get('http://localhost:4000/users/'+userID)
                        .then(response => {
                            this.setState({
                                ID : response.data._id,
                                Name: response.data.Name,
                                NIC : response.data.NIC,
                                Phone : response.data.Phone,
                                Email : response.data.Email,
                                Password : response.data.Password,
                                Type : response.data.Type,
                                Govt : response.data.Govt
                            })
                        })
                        .catch(function (error){
                            return (error);
                        })
                }

            });
        }

    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeGovtStat = this.onChangeGovtStat.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        console.log(this.props);

        this.state ={
            ID : '',
            Name : '',
            NIC : '',
            Phone : '',
            Password : '',
            Type : '',
            Govt : '',
            Email : ''
        };

    }

    componentDidMount(){
            document.title="Modify User(Admin) | Railway Management System";
        console.log("Modify App Mounted");

    }

    onChangeName(e){
        this.setState({
            Name : e.target.value
        });
    }
    onChangeNIC(e){
        this.setState({
            NIC : e.target.value
        });
    }
    onChangePhone(e){
        this.setState({
            Phone : e.target.value
        });
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
    onChangeType(e){
        this.setState({
            Type : e.target.value
        });
    }

    onChangeGovtStat(e){
            this.setState({
                Govt : e.target.value
            });
    }
    onSubmit(e){
        e.preventDefault();
        const newUser={
            Name : this.state.Name,
            NIC : this.state.NIC,
            Phone : this.state.Phone,
            Email : this.state.Email,
            Password : this.state.Password,
            Type : this.state.Type,
            Govt : this.state.Govt
        };

        axios.post(`http://localhost:4000/users/update/${this.state.ID}`, newUser)
            .then(
                res => {
                    alert(`Data of ID : ${res.data._id}, Name : ${res.data.Name}, successfully updated.`);
                });
    }

    render() {
        return(
            <div style={{marginTop: 10,width:700}} ref={(section) => { this.appDiv = section; }}>
                <h3 align="center"><u>Modify User Data</u></h3>
                <form onSubmit={this.onSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label>Name : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>NIC : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.NIC}
                            onChange={this.onChangeNIC}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Phone}
                            onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email : </label>
                        <input
                            type="email"
                            className="form-control"
                            value={this.state.Email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Govt. Status : </label>
                        <br/>
                        Government
                        <input
                            type="radio"
                            className="form-control"
                            value="true"
                            checked={(this.state.Govt === 'true')}
                            onChange={this.onChangeGovtStat}
                        />
                        Private
                        <input
                            type="radio"
                            className="form-control"
                            value="false"
                            checked={(this.state.Govt === 'false')}
                            onChange={this.onChangeGovtStat}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type : </label>
                        <br/>
                        Domestic
                        <input
                            type="radio"
                            className="form-control"
                            value="Domestic"
                            checked={(this.state.Type === 'Domestic')}
                            onChange={this.onChangeType}
                        />
                        Admin
                        <input
                            type="radio"
                            className="form-control"
                            value="Admin"
                            checked={(this.state.Type === 'Admin')}
                            onChange={this.onChangeType}
                        />

                        <div className="form-group">
                            <input type="submit" value="UpdateUser" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )

    }

}
