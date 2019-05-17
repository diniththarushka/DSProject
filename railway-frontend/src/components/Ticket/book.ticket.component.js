import React,{Component} from 'react';
import axios from "axios";

export default class BookTicket extends Component{

    constructor(props){
        super(props);
        let phn = sessionStorage.getItem('UserPhone');
        this.state={
            PType:'Card',
            cardNumber:'',
            cvvNumber:'',
            cardType:'',
            expDate:'',
            Phone:phn,
            Total: 0,
            Class1 : {
                Class1Total:0,
                TicketPrice : 0,
                TicketsAvailable: 0,
                SelectedSeats:0
            },
            Class2 : {
                Class2Total:0,
                TicketPrice :0,
                TicketsAvailable: 0,
                SelectedSeats:0
            },
            Class3 : {
                Class3Total:0,
                TicketPrice : 0,
                TicketsAvailable: 0,
                SelectedSeats:0
            }
        }
    }
    componentWillMount() {
        let log = sessionStorage.getItem('loggedIn');

        if(log !== 'true'){
            alert("Please login to book trains.");
            let {history} = this.props;
            history.push({
                pathname: '/login',
            });
            window.location.reload();
        }
    }

    componentDidMount() {
        let urlStr = this.props.location.pathname;
        let trainID = (urlStr.split('/')[2]);
        let phn = sessionStorage.getItem('UserPhone');

        axios.get('http://localhost:4000/trains/'+trainID)
            .then(response => {
                console.log(response);
                this.setState({
                    PType:'Card',
                    cardNumber:'',
                    cvvNumber:'',
                    cardType:'',
                    expDate:'',
                    Phone:phn,
                    Total: 0,
                    Class1 : {
                        Class1Total:0,
                        TicketPrice : response.data.Class1.TicketPrice,
                        TicketsAvailable: response.data.Class1.Seats,
                        SelectedSeats:0
                    },
                    Class2 : {
                        Class2Total:0,
                        TicketPrice : response.data.Class2.TicketPrice,
                        TicketsAvailable: response.data.Class2.Seats,
                        SelectedSeats:0
                    },
                    Class3 : {
                        Class3Total:0,
                        TicketPrice : response.data.Class3.TicketPrice,
                        TicketsAvailable: response.data.Class3.Seats,
                        SelectedSeats:0
                    }
                });
            });
        this.onChangeClass1Seats = this.onChangeClass1Seats.bind(this);
        this.onChangeClass2Seats = this.onChangeClass2Seats.bind(this);
        this.onChangeClass3Seats = this.onChangeClass3Seats.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangecardNumber = this.onChangecardNumber.bind(this);
        this.onChangecvvNumber = this.onChangecvvNumber.bind(this);
        this.onChangecardType = this.onChangecardType.bind(this);
        this.onChangeexpDate = this.onChangeexpDate.bind(this);
        this.onChangephone = this.onChangephone.bind(this);
        this.onChangePType = this.onChangePType.bind(this);
        this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }
    static onChangeCardPrefix(n){
        let number = n.toString();
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa";

        // Mastercard
        // Updated for Mastercard 2017 BINs expansion
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
            return "Mastercard";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners";

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        return "";
    }

    onChangePType(e){
        this.setState({
            PType:e.target.value
        });
    }
    onChangeName(e){
        this.setState({
            userName:e.target.value
        });
    }
    onChangecardNumber(e){
        let str =String(e.target.value);
        this.setState({
            cardType:BookTicket.onChangeCardPrefix(str),
            cardNumber:e.target.value
        });
    }
    onChangecvvNumber(e){
        this.setState({
            cvvNumber:e.target.value
        });
    }
    onChangecardType(e){
        this.setState({
            cardType:e.target.value
        });
    }
    onChangeexpDate(e){
        this.setState({
            expDate:e.target.value
        });
    }
    onChangephone(e){
        this.setState({
            Phone:e.target.value
        });
    }


    onChangeClass1Seats(e){
        this.setState({
            Class1:{
                Class1Total:(this.state.Class1.TicketPrice*parseFloat(e.target.value)),
                TicketPrice:this.state.Class1.TicketPrice,
                SelectedSeats:parseFloat(e.target.value)
            }
        });
    }

    onChangeClass2Seats(e){
        this.setState({
            Class2:{
                Class2Total:(this.state.Class2.TicketPrice*parseFloat(e.target.value)),
                TicketPrice:this.state.Class2.TicketPrice,
                SelectedSeats:parseFloat(e.target.value)
            }
        });
    }

    onChangeClass3Seats(e){
        this.setState({
            Class3:{
                Class3Total:(this.state.Class3.TicketPrice*(parseFloat(e.target.value))),
                TicketPrice:this.state.Class3.TicketPrice,
                SelectedSeats:parseFloat(e.target.value)
            }
        });
    }

    onChangePaymentMethod(e){

        let str = e.target.value;
        if(str === 'Card'){
            document.getElementById('DialogDiv').hidden=true;
            document.getElementById('CardDiv').hidden=false;
            this.setState({
                PType:"Card"
            });
        }else if(str === 'Dialog'){
            document.getElementById('CardDiv').hidden=true;
            document.getElementById('DialogDiv').hidden=false;
            this.setState({
                PType:"Dialog"
            });
        }

    }

    onSubmit(e){
        e.preventDefault();

        let DiscountPercentageDecimal = 1;
        if((sessionStorage.getItem('UserGovt')) === 'true'){
            axios.get('http://localhost:4000/discounts/')
                .then(response => {
                    DiscountPercentageDecimal = ((1-response.data[0].Discount));
                    let C1Total = this.state.Class1.Class1Total;
                    let C2Total = this.state.Class2.Class2Total;
                    let C3Total = this.state.Class3.Class3Total;
                    let TotalC = C1Total+C2Total+C3Total;

                    let UserID = sessionStorage.getItem('UserID');
                    let UserName = sessionStorage.getItem('UserName');
                    let urlStr = this.props.location.pathname;
                    let trainID = (urlStr.split('/')[2]);
                    let UserPhone = this.state.Phone;

                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;

                    if((this.state.Class1.Class1Total+this.state.Class2.Class2Total+this.state.Class3.Class3Total)!==0){
                        if(this.state.Phone || (this.state.cardNumber && this.state.cvvNumber)){
                            let newTicket = null;
                            if(this.state.PType === 'Card'){
                                newTicket = {
                                    UserName:UserName,
                                    UserID:UserID,
                                    TrainID:trainID,
                                    Total: TotalC*DiscountPercentageDecimal,
                                    Payment:{
                                        PaymentMethod:this.state.PType,
                                        PaymentNumber:this.state.cardNumber
                                    },
                                    Seats: {
                                        Class1: parseFloat(this.state.Class1.SelectedSeats),
                                        Class2: parseFloat(this.state.Class2.SelectedSeats),
                                        Class3: parseFloat(this.state.Class3.SelectedSeats),
                                        PaymentDate: dateTime
                                    }
                                };

                            }else if(this.state.PType === 'Dialog'){
                                newTicket = {
                                    UserName:UserName,
                                    UserID:UserID,
                                    TrainID:trainID,
                                    Total: parseFloat(TotalC*DiscountPercentageDecimal),
                                    Payment:{
                                        PaymentMethod:this.state.PType,
                                        PaymentNumber:this.state.Phone
                                    },
                                    Seats: {
                                        Class1: parseFloat(this.state.Class1.SelectedSeats),
                                        Class2: parseFloat(this.state.Class2.SelectedSeats),
                                        Class3: parseFloat(this.state.Class3.SelectedSeats),
                                        PaymentDate: dateTime
                                    }
                                };
                            }
                            if(newTicket){
                                axios.post('http://localhost:4000/tickets/add', newTicket)
                                    .then(res => console.log(res.data));

                                alert(this.printReciept(UserID,UserName,UserPhone,(TotalC*DiscountPercentageDecimal)));
                            }
                        }else
                            alert("Check Input fields and try again");
                    }else
                        alert("Ticket value cannot be 0.");
                });
        }else{
            let C1Total = this.state.Class1.Class1Total;
            let C2Total = this.state.Class2.Class2Total;
            let C3Total = this.state.Class3.Class3Total;
            let TotalC = C1Total+C2Total+C3Total;

            let UserID = sessionStorage.getItem('UserID');
            let UserName = sessionStorage.getItem('UserName');
            let urlStr = this.props.location.pathname;
            let trainID = (urlStr.split('/')[2]);
            let UserPhone = this.state.Phone;

            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;

            if((this.state.Class1.Class1Total+this.state.Class2.Class2Total+this.state.Class3.Class3Total)!==0){
                if(this.state.Phone || (this.state.cardNumber && this.state.cvvNumber)){
                    let newTicket = null;
                    let em = sessionStorage.getItem('UserEmail');
                    if(this.state.PType === 'Card'){
                        newTicket = {
                            Email:em,
                            UserName:UserName,
                            UserID:UserID,
                            TrainID:trainID,
                            Total: TotalC*DiscountPercentageDecimal,
                            Payment:{
                                PaymentMethod:this.state.PType,
                                PaymentNumber:this.state.cardNumber
                            },
                            Seats: {
                                Class1: parseFloat(this.state.Class1.SelectedSeats),
                                Class2: parseFloat(this.state.Class2.SelectedSeats),
                                Class3: parseFloat(this.state.Class3.SelectedSeats),
                                PaymentDate: dateTime
                            }
                        };

                    }else if(this.state.PType === 'Dialog'){
                        newTicket = {
                            Email:em,
                            UserName:UserName,
                            UserID:UserID,
                            TrainID:trainID,
                            Total: parseFloat(TotalC*DiscountPercentageDecimal),
                            Payment:{
                                PaymentMethod:this.state.PType,
                                PaymentNumber:this.state.Phone
                            },
                            Seats: {
                                Class1: parseFloat(this.state.Class1.SelectedSeats),
                                Class2: parseFloat(this.state.Class2.SelectedSeats),
                                Class3: parseFloat(this.state.Class3.SelectedSeats),
                                PaymentDate: dateTime
                            }
                        };
                    }
                    if(newTicket){
                        axios.post('http://localhost:4000/tickets/add', newTicket)
                            .then(res => console.log(res.data));

                        alert(this.printReciept(UserID,UserName,UserPhone,(TotalC*DiscountPercentageDecimal)));
                    }
                }else
                    alert("Check Input fields and try again");
            }else
                alert("Ticket value cannot be 0.");
        }
    }

    printReciept(userid,name,phone,Total){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let payment ='';

        if(this.state.PType === 'Card'){
            if(this.state.cardNumber.length === 16)
                payment = 'Card : xxxx xxxx xxxx '+this.state.cardNumber.substr(12,16)+'\n';
            else if(this.state.cardNumber.length === 19)
                payment = 'Card : xxxx xxxx xxxx xxx'+this.state.cardNumber.substr(15,19)+'\n';
        }else if(this.state.PType === 'Dialog'){
            payment = 'Dialog Payment : '+this.state.Phone+'\n';
        }
        let urlStr = this.props.location.pathname;
        let trainID = (urlStr.split('/')[2]);
        let border = '\n==============================================================='+'\n';
        let header = 'Generated Receipt '+'\n\n';
        let Class1Content = 'Class 1 Tickets : '+this.state.Class1.SelectedSeats+
            ' x '+this.state.Class1.TicketPrice+' = '+this.state.Class1.Class1Total+'\n';

        let Class2Content = 'Class 2 Tickets : '+this.state.Class2.SelectedSeats+
            ' x '+this.state.Class2.TicketPrice+' = '+this.state.Class2.Class2Total+'\n';

        let Class3Content = 'Class 3 Tickets : '+this.state.Class3.SelectedSeats+
            ' x '+this.state.Class3.TicketPrice+' = '+this.state.Class3.Class3Total+'\n\n';
        let total = 'Total:'+(Total)+'\n\n';
        let footer = 'Train ID : '+trainID+'\n\nUser ID : '+userid+'\nUser Name : '+name+'\nPhone : '+phone+'\n\nPrinted on :'+dateTime+'\n';
        let end = '******End of the Receipt******';

        let receipt = (border+header+Class1Content+Class2Content+Class3Content+total+payment+footer+end+border);
        return(receipt);
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Class 1 : (Ticket Price : {this.state.Class1.TicketPrice || 0}) </td>
                            <td>Available Seats : {this.state.Class1.TicketsAvailable}</td>
                            <td><input className="form-control" type="number" min={0} onChange={this.onChangeClass1Seats}/></td>
                        </tr>
                        <tr>
                            <td>Class 2 : (Ticket Price : {this.state.Class2.TicketPrice || 0}) </td>
                            <td>Available Seats : {this.state.Class2.TicketsAvailable}</td>
                            <td><input className="form-control" type="number" min={0} onChange={this.onChangeClass2Seats}/></td>
                        </tr>
                        <tr>
                            <td>Class 3 : (Ticket Price : {this.state.Class3.TicketPrice || 0}) </td>
                            <td>Available Seats : {this.state.Class3.TicketsAvailable}</td>
                            <td><input className="form-control" type="number" min={0} onChange={this.onChangeClass3Seats}/></td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                Total : (LKR)
                            </td>
                            <td>
                                {(this.state.Class1.Class1Total+this.state.Class2.Class2Total+this.state.Class3.Class3Total)|| 0}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <label>How do you need to make the Payment ?</label>
                    <br/>
                    Card :
                    <input type="radio" value="Card" name="payment" id="payment" onChange={this.onChangePaymentMethod}/>
                    Dialog :
                    <input type="radio" value="Dialog" name="payment" id="payment" onChange={this.onChangePaymentMethod}/>

                    <div id="CardDiv" hidden={true}>
                        <h3 align="center">Add card details</h3>
                        <label >Card Number :   </label>
                        <input type="number" min={0} className="form-control" value={this.state.cardNumber} onChange={this.onChangecardNumber}/>
                        <br/>
                        <label >CVV Number :   </label>
                        <input type="number" min={0} max={999} className="form-control" value={this.state.cvvNumber} onChange={this.onChangecvvNumber}/>
                        <br/>
                        <label >Card Type :   </label>
                        <input type="text" className="form-control" value={this.state.cardType} onChange={this.onChangecardType}/>
                        <br/>
                        <label >Card Expires on :   </label>
                        <input type="month" min="2018-01" className="form-control" value={this.state.expDate} onChange={this.onChangeexpDate}/>
                        <br/>
                        <input type="submit" value="Add booking" className="btn btn-primary" />
                    </div>
                    <div id="DialogDiv" hidden={true}>
                        <h3 align="center">Add Dialog phone number</h3>
                        <label >Phone(Dialog) :   </label>
                        <input type="number" className="form-control" value={this.state.Phone} onChange={this.onChangephone} />
                        <br/>
                        <input type="submit" value="Add booking" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}