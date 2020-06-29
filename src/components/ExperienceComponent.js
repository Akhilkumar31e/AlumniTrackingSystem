import React from 'react';
import Loading from './LoadingComponent';

function RenderExp({isLoading,experience}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else{
        const UserExp = experience.map((exp) => {
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
        return(
            <div className="container">
                <div >
                    {experience.length!==0 ? UserExp : <h4>No experience was added</h4>}
                </div>
            </div>
        );
    }
}

export default RenderExp;