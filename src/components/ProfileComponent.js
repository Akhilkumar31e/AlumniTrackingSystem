import React,{Component} from 'react';
import axios from 'axios';
import Loading from './LoadingComponent';
import HomeHeader from './HomeHeaderComponent';
import ProfileHeaderComponent from './ProfileHeaderComponent';

import {  Button, Modal, ModalHeader, ModalBody,Label, Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import RenderExp from './ExperienceComponent';
import {NotificationContainer,NotificationManager} from 'react-notifications';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class RenderProfile extends Component{
    render(){
    if(this.props.isLoading){
        return(
            <Loading />
        );
    }
    else{
        console.log(this.props.profileInfo);
        return(
            <React.Fragment>
                <ProfileHeaderComponent name={profileInfo.name} batch={profileInfo.yearofpassing}/>
                <div className="container">
                    <div className="row ">
                        <div className="co1-12 col-sm-2">
                            <h2 className="text-muted">Experience</h2>
                        </div>
                        <div className="col-12 col-sm-8 add-exp-button">
                            <Button onclick={addExperience} className="btn bg-primary"><span className="fa fa-plus"></span> Add experience</Button>
                        </div>
                    </div>
                    <div >
                            {profileInfo.experience.length !== 0 ? experience : <h4>No experience added, Add Experience</h4>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
}


class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            profileInfo : null,
            isLoading: true,
            experience :[],
            isExpLoading: true,
            isExpModalOpen: false
        }
        this.toggleAddExperience=this.toggleAddExperience.bind(this);
        this.handleAddExperience=this.handleAddExperience.bind(this);
    }
    toggleAddExperience(){
        this.setState({
            isExpModalOpen: !this.state.isExpModalOpen
        });
    }
    handleAddExperience(values){
        const newExp = {
            role: values.jobtitle,
            company : values.company,
            start : values.start,
            end: values.end,
            desc : values.desc
        }
        axios.post('/users/'+this.props.id+'/experience',newExp)
        .then(response => {
            NotificationManager.success('Success','Experience added:');
            this.setState({
                experience:response.data,
                isExpLoading:false
            });
            this.toggleAddExperience();
        })
        .catch(err => {
            alert(err.response.data);
        })
    }
    componentDidMount(){
        axios.get('/users/'+this.props.id)
        .then(res => {
            this.setState({
                profileInfo: res.data,
                isLoading:false,
                experience: res.data.experience,
                isExpLoading:false
            });
        })
    }
    render(){
        
        return(
            <React.Fragment>
                 <HomeHeader />
                
                <RenderProfile isLoading= {this.state.isLoading} profileInfo = {this.state.profileInfo} addExperience={this.addExperience} />
                <div className="container">
                    <div className="row ">
                    <div className="co1-12 col-sm-2">
                        <h2 className="text-muted">Experience</h2>
                    </div>
                    <div className="col-12 col-sm-8 add-exp-button">
                        <Button onClick={this.toggleAddExperience} className="btn bg-primary"><span className="fa fa-plus"></span> Add experience</Button>
                    </div>
                    </div>
                </div>
                <NotificationContainer />
                <RenderExp isLoading={this.state.isExpLoading} experience = {this.state.experience} />  
                
                <Modal isOpen={this.state.isExpModalOpen} toggle={this.toggleAddExperience}>
                    <ModalHeader toggle={this.toggleAddExperience}>
                        Add Experience
                        </ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={ (values) => this.handleAddExperience(values)}>
                            <Row className="form-group">
                                <Label htmlFor="jobtitle" md={3}>Job Title</Label>
                                <Col md={9}>
                                    <Control.text model=".jobtitle" 
                                        id="jobtitle" 
                                        placeholder="Enter Job Title" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".jobtitle"
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
                                <Label htmlFor="company" md={3}>Company Name</Label>
                                <Col md={9}>
                                    <Control.text model=".company" 
                                        id="company" 
                                        placeholder="Enter Name of the company" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".company"
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
                                <Label htmlFor="start" md={3}>Start Date</Label>
                                <Col md={9}>
                                    <Control.text model=".start" 
                                        id="start" 
                                        placeholder="Starting Month,Year" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".start"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                            }}>
                                        </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="end" md={3}>Ending Date</Label>
                                <Col md={9}>
                                    <Control.text model=".end" 
                                        id="end" 
                                        placeholder="Ending Month,Year" 
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="desc" md={3}>Description</Label>
                                <Col md={9}>
                                    <Control.text model=".desc" 
                                        id="desc" 
                                        placeholder="Brief about your job (Optional)" 
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6,offset:3}}>
                                    <Button type="submit" color="primary" block="true">
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                

                
            </React.Fragment>
        );
    }
}

export default Profile;
