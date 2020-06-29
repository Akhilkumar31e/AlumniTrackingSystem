import React,{Component} from 'react';
import axios from 'axios';
import Loading from './LoadingComponent';
import HomeHeader from './HomeHeaderComponent';
import ProfileHeaderComponent from './ProfileHeaderComponent';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderProfile({isLoading,profileInfo}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else{
        console.log(profileInfo);
        return(
            <React.Fragment>
                <ProfileHeaderComponent name={profileInfo.name} batch={profileInfo.yearofpassing}/>
            </React.Fragment>
        );
    }
}
class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            profileInfo : null,
            isLoading: true
        }
    }
    componentDidMount(){
        axios.get('/users/'+this.props.id)
        .then(res => {
            this.setState({
                profileInfo: res.data,
                isLoading:false
            });
        })
    }
    render(){
        
        return(
            <React.Fragment>
                 <HomeHeader />
                 <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/browse">Browse</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.id}</BreadcrumbItem>
                </Breadcrumb>
                <RenderProfile isLoading= {this.state.isLoading} profileInfo = {this.state.profileInfo} />
            </React.Fragment>
        );
    }
}

export default User;