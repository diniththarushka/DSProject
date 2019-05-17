import React,{Component} from 'react';
import axios from "axios";

const Ticket = props => (
    <tr>
        <td>{props.ticket.UserName}</td>
        <td>{props.ticket.UserID}</td>
        <td>{props.ticket.Payment.PaymentMethod}</td>
        <td>{props.ticket.Total}</td>
        <td>{props.ticket._id}</td>
        <td>
            <button onClick={()=>ViewTickets.viewDetails(props.ticket._id)} className="btn btn-primary">View Details</button>
        </td>
    </tr>
);

export default class ViewTickets extends Component{

    componentDidMount() {
        axios.get('http://localhost:4000/tickets/')
            .then(response => {
                this.setState({ Tickets: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    constructor(props){
        super(props);
        this.state = {
            Tickets : []
        };
        ViewTickets.viewDetails = ViewTickets.viewDetails.bind(ViewTickets);
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

    render(){
        return(
            <div  style={{paddingRight:200}}>
                <h3 align="center">Ticket Payment List</h3>
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
    }
}