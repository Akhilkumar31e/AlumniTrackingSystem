import React, { Component } from 'react'
import Loading from './LoadingComponent'
import { Card, CardHeader, CardBody, CardFooter, CardImg, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import axios from 'axios';

const required = (val) => val && val.length;

function RenderPosts({ isLoading , posts}) {
    if(isLoading)
        return <Loading />
    const feeds = posts.map(feed => {
        return (
            <div className="col-12 col-md-3  mb-2 mt-2" >
                <Card  style={{border:"2px solid black"}}>
                    <CardImg src={feed.image} height="150px"></CardImg>
                    <CardHeader className="bg-primary text-white"> {feed.title} </CardHeader>
                    <CardBody> { feed.message }</CardBody>
                    <CardFooter className="bg-primary text-white"> { feed.createdAt }</CardFooter>
                </Card>
            </div>
        )
    })
    return (
        <div className="row">
            {feeds}
        </div>
    )
}

export default class HomeBody extends Component {
    
    state = {
        isLoading: true,
        feeds: [],
        isModalOpen: false
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    componentDidMount() {
        axios.get('/getPosts')
        .then(res => {
            console.log(res.data);
            this.setState({
                isLoading: false,
                feeds: res.data
            })
        })
        .catch(err => console.log("Error while getting posts"));
    }
    
    handleCreate = (values) => {
        const post = {
            image: "http://logok.org/wp-content/uploads/2015/01/Amazon-logo-880x660.png",
            title: values.title,
            author: localStorage.getItem('userId'),
            message: values.message
        }
        axios.post('/newPost', post)
        .then(res => {
            console.log(res.data);
            this.setState({
                isLoading: false,
                feeds: res.data
            });
            this.toggleModal();
        })
        .catch(err => console.log("Error in handleCreate"));
    }
    render() {
        
         return (
                <>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}>
                            New Post
                        </ModalHeader>
                        <ModalBody >
                            <LocalForm onSubmit={(values) => this.handleCreate(values)}>
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Control.text model=".title" className="form-control" 
                                            name="title"  placeholder="Title" validators={{
                                                required
                                            }} />   
                                <Errors className="text-danger" model=".name"
                                show="touched" messages={{
                                    required: 'This is a Required Field'
                                }} />     
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="message">Message</Label>
                                <Control.textarea model=".message" name="message" rows="6"
                                        className="form-control" validators = {{
                                            required
                                        }} />
                                <Errors className="text-danger" model=".name"
                                        show="touched" messages={{
                                            required: 'This is a Required Field'
                                        }} />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" value="submit" color="primary">POST!</Button>
                            </FormGroup>
                        </LocalForm>
                        </ModalBody>
                    </Modal>

                    <div className="container-fluid" style={{backgroundColor:"rgb(53, 65, 235)"}}>
                        <div className="row">
                            <div className="col-12" >
                                <h1  className="text-white" style={{float: "left", fontFamily:"verdana", fontSize:"35px", marginTop:"10px"}}><strong>Latest Posts</strong></h1>
                                <Button color="text-white" style={{float: "right", marginTop: "13px"}} onClick={this.toggleModal}>New Post</Button>
                            </div>
                        </div>

                        <RenderPosts isLoading={this.state.isLoading} posts = {this.state.feeds}/>
                    </div>
                </>
         )
     }
 };
 