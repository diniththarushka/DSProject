import React,{Component} from 'react';
import axios from "axios";
export default class TrainAdd extends Component{

    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeArrTime = this.onChangeArrTime.bind(this);
        this.onChangeArrStation = this.onChangeArrStation.bind(this);
        this.onChangeDeptTime = this.onChangeDeptTime.bind(this);
        this.onChangeDeptStation = this.onChangeDeptStation.bind(this);
        this.onChangeClass1TP = this.onChangeClass1TP.bind(this);
        this.onChangeClass1Seats = this.onChangeClass1Seats.bind(this);
        this.onChangeClass2TP = this.onChangeClass2TP.bind(this);
        this.onChangeClass2Seats = this.onChangeClass2Seats.bind(this);
        this.onChangeClass3TP = this.onChangeClass3TP.bind(this);
        this.onChangeClass3Seats = this.onChangeClass3Seats.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state= {
            Name: '',
            ArrTime: '',
            ArrStation: '',
            DeptTime: '',
            DeptStation: '',
            Class1TicketPrice : '',
            Class1Seats : '',
            Class2TicketPrice : '',
            Class2Seats : '',
            Class3TicketPrice : '',
            Class3Seats : ''
        }
    };

    onChangeName(e){
        this.setState({
           Name  : e.target.value
        });
    }

    onChangeArrTime(e){
        this.setState({
            ArrTime:e.target.value
        });
    }

    onChangeArrStation(e){
       this.setState({
           ArrStation:e.target.value
       });
    }

    onChangeDeptTime(e){
        this.setState({
            DeptTime: e.target.value
        });
    }

    onChangeDeptStation(e){
        this.setState({
            DeptStation: e.target.value
        });
    }

    onChangeClass1TP(e){
        this.setState({
           Class1TicketPrice : e.target.value
        });
    }

    onChangeClass1Seats(e){
        this.setState({
            Class1Seats : e.target.value

        });
    }

    onChangeClass2TP(e){
        this.setState({
            Class2TicketPrice : e.target.value

        });
    }

    onChangeClass2Seats(e){
        this.setState({
            Class2Seats : e.target.value

        });
    }

    onChangeClass3TP(e){
        this.setState({
            Class3TicketPrice : e.target.value

        });
    }

    onChangeClass3Seats(e){
        this.setState({
            Class3Seats : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newTrain={
            Name: this.state.Name,
            ArrTime: this.state.ArrTime,
            ArrStation: this.state.ArrStation,
            DeptTime: this.state.DeptTime,
            DeptStation: this.state.DeptStation,
            Class1: {
                TicketPrice : this.state.Class1TicketPrice,
                Seats : this.state.Class1Seats
            },
            Class2: {
                TicketPrice : this.state.Class2TicketPrice,
                Seats : this.state.Class2Seats
            },
            Class3: {
                TicketPrice : this.state.Class3TicketPrice,
                Seats : this.state.Class3Seats
            }
        };

        axios.post('http://localhost:4000/trains/add', newTrain)
            .then(res => {
                console.log(res);
                alert(`Train Name: ${res.data.Name} ,: ID ${res.data._id}`);
                    this.state= {
                        Name: '',
                        ArrTime: '',
                        ArrStation: '',
                        DeptTime: '',
                        DeptStation: '',
                        Class1TicketPrice : '',
                        Class1Seats : '',
                        Class2TicketPrice : '',
                        Class2Seats : '',
                        Class3TicketPrice : '',
                        Class3Seats : ''
                    }
            }
            );
    }

    componentDidMount() {
        document.title="Add Train | Railway Management System";
    }


    render() {
        return(
            <div style={{marginTop: 10,width:700}}>
                <h3 align="center">Add new Train</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Name || ''}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Arrival Station : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.ArrStation || ''}
                            onChange={this.onChangeArrStation}
                        />
                    </div>
                    <div className="form-group">
                        <label>Arrival Time : </label>
                        <input
                            type="time"
                            className="form-control"
                            value={this.state.ArrTime || ''}
                            onChange={this.onChangeArrTime}
                        />
                    </div>
                    <div className="form-group">
                        <label>Departure Station : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.DeptStation || ''}
                            onChange={this.onChangeDeptStation}
                        />
                    </div>
                    <div className="form-group">
                        <label>Departure Time : </label>
                        <input
                            type="time"
                            className="form-control"
                            value={this.state.DeptTime || ''}
                            onChange={this.onChangeDeptTime}
                        />
                    </div>
                    <div className="form-group">
                        <label>Class 1 : </label>
                        <br/>
                        <label>Ticket Price : </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.Class1TicketPrice || ''}
                            onChange={this.onChangeClass1TP}
                        />
                        <br/>
                        <label>Seats : </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.Class1Seats || ''}
                            onChange={this.onChangeClass1Seats}
                        />
                    </div>
                    <div className="form-group">
                        <label>Class 2 : </label>
                        <br/>
                        <label>Ticket Price : </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.Class2TicketPrice || ''}
                            onChange={this.onChangeClass2TP}
                        />
                        <br/>
                        <label>Seats : </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.Class2Seats || ''}
                            onChange={this.onChangeClass2Seats}
                        />
                    </div>
                    <div className="form-group">
                        <label>Class 3 : </label>
                        <br/>
                        <label>Ticket Price : </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.Class3TicketPrice || ''}
                            onChange={this.onChangeClass3TP}
                        />
                        <br/>
                        <label>Seats : </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.Class3Seats || ''}
                            onChange={this.onChangeClass3Seats}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="RegisterTrain" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        );
    }
}