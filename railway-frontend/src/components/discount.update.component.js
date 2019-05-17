import React,{Component} from 'react';
import axios from 'axios';

export default class DiscountUpdator extends Component{

    constructor(props){
        super(props);
        this.state={
            discountID:'',
            discountRate:''
        };
        this.onChangeDiscountRate = this.onChangeDiscountRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:4000/discounts/')
            .then(response => {
                let x=response.data[0].Discount;
                if(x){
                    console.log(response.data[0].Discount *100);
                }
                this.setState({
                    discountID:response.data[0]._id,
                    discountRate:response.data[0].Discount *100
                });
            });
    }

    onChangeDiscountRate(e){
        this.setState({
            discountRate:(e.target.value)
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newDiscount = {
            Discount : this.state.discountRate/100
        };

        axios.post(`http://localhost:4000/discounts/update/${this.state.discountID}`, newDiscount)
            .then(
                res => {
                    alert(`Discount of ID : ${res.data._id}, successfully updated.`);
                });
    }

    render(){
        return(

            <form onSubmit={this.onSubmit} className="form-group">
                <h4><u>Change Discount Rate</u></h4>
            <div className="container"style={{marginTop:30}}>
                <label>Discount Rate : (0-100) : </label>
                <input type="number" max={100} min={0} value={this.state.discountRate} onChange={this.onChangeDiscountRate}/>
            </div>
                <input type="submit" className="btn btn-primary" onChange={this.onSubmit}/>
            </form>
        );
    }
}