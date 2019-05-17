import React,{Component} from 'react';
import UserList from './userlist.component';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import TrainMgt from "./Trains/train.management.component";
import DiscountUpdator from "./discount.update.component";
import ViewTickets from "./Ticket/view.tickets.component";
import axios from "axios";

const Ticket = props => (
    <tr>
        <td>{props.ticket.UserName}</td>
        <td>{props.ticket.UserID}</td>
        <td>{props.ticket.Payment.PaymentMethod}</td>
        <td>{props.ticket.Total}</td>
        <td>{props.ticket._id}</td>
        <td>
            <button onClick={()=>MyAccount.viewDetails(props.ticket._id)} className="btn btn-primary">View Details</button>
        </td>
    </tr>
);

export default class MyAccount extends Component {


    constructor(props){
        super(props);
        this.state = {
            Tickets : []
        };
        MyAccount.viewDetails = MyAccount.viewDetails.bind(MyAccount);
    }

    static viewDetails(id){
        axios.get('http://localhost:4000/tickets/'+id).then(
            response=>{
                let str='===============================\n';
                let payment='Payment Method : '+response.data.Payment.PaymentMethod+'\n';
                payment+='Payment Number : '+response.data.Payment.PaymentNumber+'\n';
                payment+='Total : (LKR) '+response.data.Total+'\n';
                let classInfo='Class 1 Tickets : '+response.data.Seats.Class1+'\n';
                classInfo+='Class 2 Tickets : '+response.data.Seats.Class2+'\n';
                classInfo+='Class 3 Tickets : '+response.data.Seats.Class3+'\n';
                let UserInfo='User Name : '+response.data.UserName+'\n';
                UserInfo+='User ID : '+response.data.UserID+'\n';
                let trainInfo='Train ID : '+response.data.TrainID+'\n';
                let date='Purchase Date : '+response.data.Seats.PaymentDate+'\n';

                alert(str+payment+classInfo+UserInfo+trainInfo+date+str);
            }
        )
    }

    ticketList() {
        return this.state.Tickets.map(function(currentTicket, i){
            return <Ticket ticket={currentTicket} key={i} />;
        })
    }

    componentDidMount() {
        document.title="My Account | Railway Management System";
        let usrname = sessionStorage.getItem('UserName');
        axios.get('http://localhost:4000/tickets/byName/'+usrname)
            .then(response => {
                this.setState({ Tickets: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    render() {
        let type = sessionStorage.getItem('UserType');

        if (type === 'Domestic') {
            return (
                <div>
                    <h2>Welcome to my Account!</h2>
                    <p>Now you can buy tickets through our homepage</p>
                    <br/>
                    <h2>Your ticket purchase history</h2>
                    <br/>
                    <table className="table table-striped" style={{ marginTop: 20} }>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>User ID</th>
                            <th>Payment Type</th>
                            <th>Total</th>
                            <th>Ticket ID</th>
                            <th>See more</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.ticketList() }
                        </tbody>
                    </table>
                </div>

            );
        } else if (type === 'Admin') {
            return (
                <Router>
                    <div>
                        <h3 align="center">Welcome Admin</h3>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/myAccount/users" className="nav-link">Users</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/myAccount/trains" className="nav-link">Trains</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/myAccount/tickets" className="nav-link">Tickets</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/myAccount/updateDiscount" className="nav-link">Discount</Link>
                                </li>
                            </ul>
                        </nav>

                    </div>
                    <Route path="/myAccount/tickets" component={ViewTickets}/>
                    <Route path="/myAccount/updateDiscount" component={DiscountUpdator}/>
                    <Route path="/myAccount/users" component={UserList}/>
                    <Route path="/myAccount/trains" component={TrainMgt}/>
                </Router>
            );

        }
    }
}
