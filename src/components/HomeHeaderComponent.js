import React, { Component } from 'react'
import { Navbar, NavItem, NavbarBrand, NavbarToggler, Collapse, Nav,Button} from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom';
import  axios from 'axios';

export default class HomeHeader extends Component {

    constructor() {
        super();
        this.state = {
            isNavOpen: false,
            isLoggedOut: false,
            isLoading: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    handleLogout() {
        this.setState({
            isLoading:true
        })
        axios.get('/logout')
        .then(res => {
            this.setState({
                isLoggedOut:true
            })
            this.setState({
                isLoading:false
            })
            localStorage.removeItem('userId');

        })
        .catch(err => {
            alert(err);
        });
    }
    render() {
        return (
            <React.Fragment>
                {this.state.isLoggedOut && <Redirect to="/login" />}
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler  onClick={this.toggleNav} />
                    <NavbarBrand className = "mr-auto" href="/home">
                        Alumni Tracking System
                    </NavbarBrand>
                    
                    <Collapse isOpen={this.state.isNavOpen} navbar >
                        <span className="mr-auto" />
                        <Nav navbar>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/home">
                                    <span className = "fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/home">
                                    <span className = "fa fa-user fa-lg"></span> {localStorage.getItem('userId')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/home">
                                    <span className = "fa fa-bell fa-md"></span> Notifications
                                </NavLink>
                            </NavItem>
                            <NavItem>
                            <Button className="btn bg-light mr-3"  onClick={this.handleLogout}>
                                {this.state.isLoading&& <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary fa-sm"></span>}<span className="fa fa-sign-out fa-lg text-primary"></span> <span className="text-primary"> Log Out</span>
                            </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            </React.Fragment>
        )
    }
};
