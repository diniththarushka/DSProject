import React,{Component} from 'react';

export default class Logout extends Component{

    render(){
        sessionStorage.setItem('loggedIn','false');

        sessionStorage.removeItem('UserID');
        sessionStorage.removeItem('UserName');
        sessionStorage.removeItem('UserNIC');
        sessionStorage.removeItem('UserPhone');
        sessionStorage.removeItem('UserEmail');
        sessionStorage.removeItem('UserPassword');
        sessionStorage.removeItem('UserType');

        let{history} = this.props;
        history.push({
            pathname:'/',
        });
        window.location.reload();
        return(
            <div></div>
        );
    }
}