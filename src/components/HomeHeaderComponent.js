import React, { Component } from 'react'
import { Navbar, NavItem, NavbarBrand, NavbarToggler, Collapse, Nav} from 'reactstrap'
import { NavLink } from 'react-router-dom'

export default class HomeHeader extends Component {

    constructor() {
        super();
        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    render() {
        return (
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
                                    <span className = "fa fa-user fa-lg"></span> My Profile
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/home">
                                    <span className = "fa fa-bell fa-md"></span> Notifications
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        )
    }
};
