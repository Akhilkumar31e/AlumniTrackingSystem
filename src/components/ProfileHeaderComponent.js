import React from 'react';
import {Jumbotron} from 'reactstrap';

function ProfileHeader(props){
    return(
        <React.Fragment>
            <div className="profileheader">
            <Jumbotron>
            <div className="row row-header"> 
                <div className="col-12 col-sm-2">
                    <img className="img-fluid img-thumbnail"  src="/assets/images/profile_pic.png" alt="Profile pic" />
                </div>
                <div className="col-12 col-sm-3 ">
                    <h1>{props.name}</h1>
                    <p>Class of <span className="badge badge-pill badge-light">{props.batch}</span></p>
                </div>
            </div>
            </Jumbotron>
            </div>
        </React.Fragment>
    );
}

export default ProfileHeader;