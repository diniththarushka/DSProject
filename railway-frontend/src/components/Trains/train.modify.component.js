import React,{Component} from 'react';
import scrollToComponent from 'react-scroll-to-component';
import axios from "axios";

export default class TrainModify extends Component{

    constructor(props){
     super(props);

     this.state={
         ID : '',
         Name:'',
         ArrStation:'',
         ArrTime:'',
         DeptStation:'',
         DeptTime:'',
         Class1TicketPrice:'',
         Class1Seats:'',
         Class2TicketPrice:'',
         Class2Seats:'',
         Class3TicketPrice:'',
         Class3Seats:''
     };
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangeArrTime = this.onChangeArrTime.bind(this);
            this.onChangeArrStation = this.onChangeArrStation.bind(this);
            this.onChangeDeptTime = this.onChangeDeptTime.bind(this);
            this.onChangeDeptStation = this.onChangeDeptStation.bind(this);
            this.onChangeClass1Seats = this.onChangeClass1Seats.bind(this);
            this.onChangeClass1TP = this.onChangeClass1TP.bind(this);
            this.onChangeClass2Seats = this.onChangeClass2Seats.bind(this);
            this.onChangeClass2TP = this.onChangeClass2TP.bind(this);
            this.onChangeClass3Seats = this.onChangeClass3Seats.bind(this);
            this.onChangeClass3TP = this.onChangeClass3TP.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(e){
        this.setState({
            Name:e.target.value
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
            DeptTime:e.target.value
        });
    }
    onChangeDeptStation(e){
        this.setState({
            DeptStation:e.target.value
        });
    }
    onChangeClass1Seats(e){
        this.setState({
            Class1Seats : e.target.value
        });
    }
    onChangeClass1TP(e){
        this.setState({
            Class1TicketPrice: e.target.value
        });
    }
    onChangeClass2Seats(e){
        this.setState({
            Class2Seats : e.target.value
        });
    }
    onChangeClass2TP(e){
        this.setState({
            Class2TicketPrice: e.target.value
        });
    }
    onChangeClass3Seats(e){
        this.setState({
            Class3Seats : e.target.value
        });
    }
    onChangeClass3TP(e){
        this.setState({
            Class3TicketPrice: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        console.log("Hi");
        let newTrain={
            Name: this.state.Name,
            ArrTime: this.state.ArrTime,
            ArrStation: this.state.ArrStation,
            DeptTime: this.state.DeptTime,
            DeptStation: this.state.DeptStation,
            Class1: {
                TicketPrice : parseFloat(this.state.Class1TicketPrice),
                Seats : parseFloat(this.state.Class1Seats)
            },
            Class2: {
                TicketPrice : parseFloat(this.state.Class2TicketPrice),
                Seats : parseFloat(this.state.Class2Seats)
            },
            Class3: {
                TicketPrice : parseFloat(this.state.Class3TicketPrice),
                Seats : parseFloat(this.state.Class3Seats)
            }
        };
        console.log(newTrain);
        let urlStr = this.props.location.pathname;
        let trainID = (urlStr.split('/')[2]);
        console.log(trainID);
        axios.post('http://localhost:4000/trains/update/'+trainID, newTrain)
            .then(res => {
                    console.log(res);
                    alert(`Train Updated Successfully.`);
                }
            );

    };

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
        let urlStr = this.props.location.pathname;
        let trainID = (urlStr.split('/')[2]);
        console.log(trainID);

        axios.get('http://localhost:4000/trains/'+trainID).then(
            response => {
                this.setState({
                    Name: response.data.Name,
                    ArrStation: response.data.ArrStation,
                    ArrTime: response.data.ArrTime,
                    DeptStation: response.data.DeptStation,
                    DeptTime: response.data.DeptTime,
                    Class1TicketPrice:response.data.Class1.TicketPrice,
                    Class1Seats: response.data.Class1.Seats,
                    Class2TicketPrice: response.data.Class2.TicketPrice,
                    Class2Seats: response.data.Class2.Seats,
                    Class3TicketPrice: response.data.Class3.TicketPrice,
                    Class3Seats: response.data.Class3.Seats
                });
                scrollToComponent(this.appDiv);
            })
            .catch(function (error) {
                return (error);
            });
    });
    }

    componentDidMount() {
        document.title="Update Train | Railway Management System";
        scrollToComponent(this.appDiv);
    }

    render() {
        return(
            <div style={{marginTop: 10,width:700}} ref={(section) => { this.appDiv = section; }}>
                <h3 align="center">Update Train</h3>
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
                            min={0}
                            className="form-control"
                            value={this.state.Class1TicketPrice}
                            onChange={this.onChangeClass1TP}
                        />
                        <br/>
                        <label>Seats : </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            value={this.state.Class1Seats}
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
                            min={0}
                            value={this.state.Class2TicketPrice }
                            onChange={this.onChangeClass2TP}
                        />
                        <br/>
                        <label>Seats : </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            value={this.state.Class2Seats }
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
                            min={0}
                            value={this.state.Class3TicketPrice}
                            onChange={this.onChangeClass3TP}
                        />
                        <br/>
                        <label>Seats : </label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            value={this.state.Class3Seats}
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