import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link } from 'react-router-dom';
import axios from 'axios';
import BookTicket from "./Ticket/book.ticket.component";
const Train = props => (
    <tr>
        <td>{props.train.Name}</td>
        <td>{props.train.ArrTime}</td>
        <td>{props.train.ArrStation}</td>
        <td>{props.train.DeptTime}</td>
        <td>{props.train.DeptStation}</td>
        <td>
            <Link to={"/book/"+props.train._id}>Book</Link>
        </td>
    </tr>
);

export default class Home extends Component{

    componentDidMount() {
        document.title="Home | Railway Management System";
        axios.get('http://localhost:4000/trains/')
            .then(response => {
                this.setState({ Trains: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    constructor(props){
        super(props);
        this.state = {
            Trains : []
        };
    }

    trainList() {
        return this.state.Trains.map(function(currentTrain, i){
            return <Train train={currentTrain} key={i} />;
        })
    }

    render(){
        return(
        <Router>
        <div  style={{paddingRight:200}}>
            <h3 align="center">Train List</h3>
            <table className="table table-striped" style={{ marginTop: 20} }>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Arrival Time</th>
                    <th>Arrival Station</th>
                    <th>Departure Time</th>
                    <th>Departure Station</th>
                    <th>Book</th>
                </tr>
                </thead>
                <tbody>
                { this.trainList() }
                </tbody>
            </table>
        </div>
            <Route path="/book/" component={BookTicket}/>
        </Router>
        );
    }
}