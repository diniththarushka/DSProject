import React,{Component} from 'react';
import axios from "axios";

export default class TrainDelete extends Component{
    componentDidMount() {
        document.title="Delete Train | Railway Management System";
    }

    static deleteTrainFromDB(id){

        axios.delete('http://localhost:4000/trains/'+id)
            .then(response => {
                alert("Data successfully deleted for :"+response.data.Name);
            });
    }

    render() {
        let urlStr = this.props.location.pathname;
        let trainID = (urlStr.split('/')[2]);
        console.log(trainID);
        TrainDelete.deleteTrainFromDB(trainID);
        let{history} = this.props;
        history.push({
            pathname:'/myAccount/trains',
        });
        return(
            <div>
            </div>
        );
    }
}