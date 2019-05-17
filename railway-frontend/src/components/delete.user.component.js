import React,{Component} from 'react';
import axios from "axios";

export default class deleteUser extends Component{

    static deleteUserFromDB(id){
        axios.delete('http://localhost:4000/users/'+id)
            .then(response => {
                alert("Data successfully deleted for :"+response.data.Name+" ID : "+response.data._id);
            });
    }

    render(){
        let urlStr = this.props.location.pathname;
        let userID = (urlStr.split('/')[3]);
        console.log(userID);
        deleteUser.deleteUserFromDB(userID);
        return(
            <div>
            </div>
        );
    }
}