import React,{Component} from 'react';

import Display from './DisplayComponent';
import { Navbar, NavbarBrand,Nav,NavItem, Button, Modal, ModalHeader, ModalBody, FormGroup,Label, Input,Form, Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
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
    handleRegister(values){
        this.toggleRegisterModal();
        console.log('Registration details are: ' + JSON.stringify(values));
        alert('Registration details are: ' + JSON.stringify(values));
    }
    toggleLoginModal(){
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }
    toggleRegisterModal(){
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen
        });
    }
    render(){
        return(
            <React.Fragment>
                <Navbar dark >
                    <NavbarBrand className="mr-auto" href="/React-First-Application/">
                           Alumni Tracking System
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button className="bg-light" outline onClick={this.toggleLoginModal}>
                                <span className="fa fa-sign-in fa-lg"></span> Log in
                            </Button>
                            <Button className="bg-light" outline onClick={this.toggleRegisterModal}>
                                <span className="fa fa-registered fa-lg"></span> Register
                            </Button>
                        </NavItem>
                        
                    </Nav>
                   
                </Navbar>
                <Modal size="lg" isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
                    <ModalHeader toggle={this.toggleRegisterModal}>
                        Register 
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={ (values) => this.handleRegister(values)}>
                            <Row className="form-group">
                                <Label htmlFor="fullname" md={3}>Full Name</Label>
                                <Col md={9}>
                                    <Control.text model=".fullname" 
                                        id="fullname" 
                                        placeholder="Enter your full Name" 
                                        className="form-control" 
                                         validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                         />
                                          <Errors
                                            className="text-danger"
                                            model=".fullname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="collegerno" md={3}>College Roll No</Label>
                                <Col md={9}>
                                    <Control.text model=".collegerno" 
                                        id="collegerno" 
                                        placeholder="Enter your College Roll Number" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(10),maxLength: maxLength(10)
                                        }}/>
                                         <Errors
                                            className="text-danger"
                                            model=".collegerno"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be equal to 10 characters',
                                                maxLength: 'Must be 10 characters'
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="branch" md={3}>Select your branch</Label>
                                <Col md={4}>
                                    <Control.select model=".branch" name="branch"
                                    className="form-control">
                                        <option>CSE</option>
                                        <option>ECE</option>
                                        <option>IT</option>
                                        <option>Mechanical</option>
                                        <option>Civil</option>
                                        <option>EIE</option>
                                        <option>EEE</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="passyear" md={3}>Year Of Passing</Label>
                                <Col md={9}>
                                    <Control.text model=".passyear" 
                                        id="passyear" 
                                        placeholder="Year Of Passing" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(4),maxLength: maxLength(4),isNumber
                                        }} />
                                        <Errors
                                            className="text-danger"
                                            model=".passyear"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Enter valid year',
                                                maxLength: 'Enter valid year',
                                                isNumber:'Must be number'
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={3}> Email</Label>
                                <Col md={9}>
                                    <Control.text model=".email" 
                                        id="email" 
                                        placeholder="Enter your Email Id" 
                                        className="form-control"
                                        validators={{
                                            required,validEmail
                                        }} />
                                        <Errors
                                            className="text-danger"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                validEmail:'Enter valid email'
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="mobile" md={3}>Mobile Number</Label>
                                <Col md={9}>
                                    <Control.text model=".mobile" 
                                        id="mobile" 
                                        placeholder="Enter your Mobile number" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(10),maxLength: maxLength(10),isNumber
                                        }} />
                                         <Errors
                                            className="text-danger"
                                            model=".mobile"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Enter valid mobile number',
                                                maxLength: 'Enter valid mobile number',
                                                isNumber:'Must be number'
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={3}>Password</Label>
                                <Col md={9}>
                                    <Control.password model=".password" 
                                        id="password" 
                                        placeholder="Enter your password" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(5)
                                        }}  />
                                        <Errors
                                            className="text-danger"
                                            model=".password"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Password must be atleast 5 characters',
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="confirmpassword" md={3}>Confirm Password</Label>
                                <Col md={9}>
                                    <Control.password model=".confirmpassword" 
                                        id="confirmpassword" 
                                        placeholder="Re-Enter your password" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(5)
                                        }}  />
                                        <Errors
                                            className="text-danger"
                                            model=".password"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Password must be atleast 5 characters',
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6,offset:3}}>
                                    <Button type="submit" color="primary" block="true">
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
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