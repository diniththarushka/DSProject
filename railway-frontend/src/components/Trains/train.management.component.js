import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import axios from "axios";
import TrainModify from "./train.modify.component";
import TrainDelete from "./train.delete.component";
import TrainAdd from "./train.add.component";

const Train = props => (
    <tr>
        <td>{props.train.Name}</td>
        <td>{props.train.ArrTime}</td>
        <td>{props.train.ArrStation}</td>
        <td>{props.train.DeptTime}</td>
        <td>{props.train.DeptStation}</td>
        <td>
            <Link className="btn btn-primary" to={"/trainsModify/"+props.train._id}>Modify</Link>
        </td>
        <td>
            <Link className="btn btn-danger" to={"/trainsDelete/"+props.train._id}>Delete</Link>
        </td>
    </tr>
);

export default class TrainMgt extends Component{

    componentDidMount() {
        document.title="Trains(Admin) | Railway Management System";
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
            <div>
                <h3 align="center">Trains List</h3>
                <table className="table table-striped" style={{ marginTop: 20}} >
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Arrival Time</th>
                        <th>Arrival Station</th>
                        <th>Departure Time</th>
                        <th>Departure Station</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.trainList() }
                    </tbody>
                </table>

                <TrainAdd />
            </div>
            <Route path="/trainsModify/" component={TrainModify}/>
            <Route path="/trainsDelete/" component={TrainDelete}/>
        </Router>
        );
    }
}
