import React,{Component} from 'react';
import {Switch, Route , Redirect, withRouter} from 'react-router-dom';
import Login from './LoginComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Display from './DisplayComponent';
class Main extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const PrivateRoute= ({component: Component,...rest}) => {
            return(
            <Route {...rest} render = {(props) => (
                localStorage.getItem('userId')!=null
                ? <Component {...props} />
                : <Redirect  to="/login" />
            )} />
            )
        }
        return(
            <React.Fragment>
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/display" component={Display} />
                    <PrivateRoute exact path="/home" component={Home} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(Main);