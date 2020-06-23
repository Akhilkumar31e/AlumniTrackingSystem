import React,{Component} from 'react';

import Display from './DisplayComponent';
import { Navbar, NavbarBrand,Nav,NavItem, Button, Modal, ModalHeader, ModalBody, FormGroup,Label, Input,Form} from 'reactstrap';
class Login extends Component{
    constructor(props){
        super(props);

        this.state= {
            isLoginModalOpen: false,
            isRegisterModalOpen: false
        }
        this.handleLogin=this.handleLogin.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
        this.toggleLoginModal=this.toggleLoginModal.bind(this);
        this.toggleRegisterModal=this.toggleRegisterModal.bind(this);
    }
    handleLogin(event){
        this.toggleLoginModal();
        alert("Username:" + this.username.value +"Password: "+ this.password.value+"You are logged in");
        event.preventDefault();
    }
    handleRegister(){

    }
    toggleLoginModal(){
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }
    toggleRegisterModal(){
        this.setState({
            isRegisterModalOpen: !this.isRegisterModalOpen
        });
    }
    render(){
        return(
            <React.Fragment>
                <Navbar dark>
                    <NavbarBrand className="mr-auto" href="/React-First-Application/">
                           Alumni Tracking System
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleLoginModal}>
                                <span className="fa fa-sign-in fa-lg"></span> Log in
                            </Button>
                            <Button outline >
                                <span className="fa fa-registered fa-lg"></span> Register
                            </Button>
                        </NavItem>
                        
                    </Nav>
                   
                </Navbar>
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>
                        Login
                        </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={(input) => this.username =input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={(input) => this.password =input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Display />
            </React.Fragment>
        );
    }
}

export default Login;