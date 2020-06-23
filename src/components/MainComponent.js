import React,{Component} from 'react';
import {Switch, Route , Redirect, withRouter} from 'react-router-dom';
import Login from './LoginComponent';
import Footer from './FooterComponent';
class Main extends Component{
    render(){
        return(
            <React.Fragment>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Redirect to="/login" />
                </Switch>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(Main);