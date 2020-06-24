import React, { Component } from 'react'
import { FEEDS } from '../shared/feeds'
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap'

 export default class HomeBody extends Component {
    
     render() {
        const feeds = FEEDS.map(feed => {
            return (
                <div className="col-12 col-md-5 mr-1 mt-3">
                    <Card>
                        <CardHeader> {feed.header} </CardHeader>
                        <CardBody> { feed.description }</CardBody>
                        <CardFooter> { feed.date }</CardFooter>
                    </Card>
                </div>
            )
        })
         return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8" >
                                <h1>Posts</h1>
                                <div className="row">
                                    {feeds}
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                Profile at a Glance
                            </div>
                        </div>
                    </div>
                </>
         )
     }
 };
 