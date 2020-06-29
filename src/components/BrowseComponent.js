import React ,{ Component} from 'react';
import axios from 'axios';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';
import {Jumbotron} from 'reactstrap';
import { Navbar, NavbarBrand,Nav,NavItem, Button, Modal, ModalHeader, ModalBody, FormGroup,Label, Input,Form, Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';

const isNumber = (val) => !isNaN(Number(val));
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
function RenderUsers ({isLoading,userlist}) {
    if(isLoading){
        return(
            <Loading />
        );
    }
    else{
        if(userlist.length ==0 ){
            return(
                <h4>No users found</h4>
            );
        }
        else{
            const users= userlist.map( (user ) => {
                return(
                    <div key={user.rollnumber}>
                        <div className="container">
                            <div className="row user-row">
                                <div className="col-12 col-sm-4">
                                    <h5>
                                    {localStorage.getItem('userId')==user.rollnumber && <span className="badge badge-pill badge-danger"> ME</span>}
                                        <span className="fa fa-user fa-lg"> {user.name}</span>
                                        <span className="badge badge-pill badge-primary"> {user.branch}</span>
                                    </h5>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <h6>Class of {user.yearofpassing}</h6>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <Link  to = {`/browse/${user.rollnumber}`}>
                                        <span className = "fa fa-external-link"> View More</span> 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });

            return(
                <div>
                    <h3>Alumni from class of {userlist[0].yearofpassing} and {userlist[0].branch} department.</h3>
                    {users}
                </div>
            );
        }
    }
}

class Browse extends Component{
    constructor(props) {
        super(props);

        this.state ={
            isLoading : true,
            userlist: null
        }
        this.handleFilter= this.handleFilter.bind(this);
    }
    handleFilter(values){
        this.setState({
            isLoading: true
        });
        const filter = {
            yearofpassing: values.passyear,
            branch: values.branch
        }
        axios.post('/users/filter',filter)
        .then(res => {
            console.log(res.data);
            this.setState({
                isLoading:false,
                userlist: res.data
            })
        })
        .catch(err => alert(err.response.data));

    }
    componentDidMount(){
        axios.get('/users/'+this.props.id)
        .then(res => {
            console.log(res);
            const initial = {
                yearofpassing: res.data.yearofpassing,
                branch: res.data.branch
            }
            axios.post('/users/filter',initial)
            .then( response => {
                console.log(response.data);
                this.setState({
                    isLoading:false,
                    userlist: response.data
                })
            })
            .catch(err => alert(err.response.data));
        })
        .catch(err => alert(err.response.data));
    }

    render(){
        return(
            <React.Fragment>
                <HomeHeader />
                <Jumbotron>
                    <div className="row row-headerjustify-content-center"> 
                        <div className="col-12 ">
                            <h1>Browse across all our Alumni!!!</h1>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">
                    <div className="row tagline-row">
                        <div className="col-12">
                        <LocalForm  onSubmit={ (values) => this.handleFilter(values)}>
                        <Row className="form-group">
                                <Label htmlFor="passyear" md={2}>Year Of Passing</Label>
                                <Col md={2}>
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
                                <Label htmlFor="branch" md={2}>Select branch</Label>
                                <Col md={2}>
                                    <Control.select model=".branch" name="branch" id="branch"
                                    className="form-control">
                                        <option>Branch</option>
                                        <option >CSE</option>
                                        <option>ECE</option>
                                        <option>IT</option>
                                        <option>Mechanical</option>
                                        <option>Civil</option>
                                        <option>EIE</option>
                                        <option>EEE</option>
                                    </Control.select>
                                </Col>
                                <Col md={4}>
                                    <Button type="submit" color="primary" block="true">
                                        Search
                                    </Button>
                                </Col>
                        </Row>
                        </LocalForm>
                        </div>
                    </div>
                </div>
                
                <RenderUsers isLoading={this.state.isLoading} userlist={this.state.userlist} />
            </React.Fragment>
        );
    }
}

export default Browse;