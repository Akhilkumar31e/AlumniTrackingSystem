import React,{Component} from 'react';
import {Switch, Route , Redirect, withRouter} from 'react-router-dom';

import Login from './LoginComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Browse from './BrowseComponent';
import Profile from './ProfileComponent';
import User from './UserComponent';


class Main extends Component{
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
        const SelectedProfile = ({match}) => {
            return(
                <React.Fragment>
                    <User id={match.params.userid} />
                </React.Fragment>
            );
        }
        return(
            
            <React.Fragment>
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/profile" component={() => <Profile id={localStorage.getItem('userId')} />} />
                    <PrivateRoute exact path="/home" component={Home} />
                    <PrivateRoute exact path="/browse" component={() => <Browse id={localStorage.getItem('userId')}/>} />
                    <PrivateRoute exact path="/browse/:userid" component={SelectedProfile} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(Main);