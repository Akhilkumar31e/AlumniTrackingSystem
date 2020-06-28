import React,{Component} from 'react';
import axios from 'axios';
import Loading from './LoadingComponent';
import HomeHeader from './HomeHeaderComponent';
import ProfileHeaderComponent from './ProfileHeaderComponent';
import { Button } from 'reactstrap';
function RenderProfile({isLoading,profileInfo,addExperience}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else{
        const experience = profileInfo.experience.map((exp) => {
            return(
                <div key={exp._id}>
                        <div className="row row-display row-edu">
                            <div className="col-12 col-sm-6 ">
                                <h3>{exp.role}</h3>
                                <div className="row">
                                    <div className="col-4">
                                        <h5>{exp.company}</h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 className="text-muted">{exp.start}-{exp.end}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <p>{exp.desc}</p>
                            </div>
                        </div>
                    </div>
            );
        })
        console.log(profileInfo);
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
                            {profileInfo.experience.length!=0 ? experience : <h4>No experience added, Add Experience</h4>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            profileInfo : null,
            isLoading: true
        }
        this.addExperience=this.addExperience.bind(this);
    }
    addExperience(){
        this.setState({
            isLoading: true
        })
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
                <RenderProfile isLoading= {this.state.isLoading} profileInfo = {this.state.profileInfo} addExperience={this.addExperience} />
                
            </React.Fragment>
        );
    }
}

export default Profile;