import React, { Component } from 'react'
import { FEEDS } from '../shared/feeds'
import { Card, CardHeader, CardBody, CardFooter, CardImg } from 'reactstrap'

 export default class HomeBody extends Component {
    
     render() {
        const feeds = FEEDS.map(feed => {
            return (
                <div className="col-12 col-md-5 mr-5 mt-3">
                    <Card  style={{width: "400px", border:"2px solid black"}}>
                        <CardImg src={feed.image} height="150px"></CardImg>
                        <CardHeader className="bg-primary text-white"> {feed.header} </CardHeader>
                        <CardBody> { feed.description }</CardBody>
                        <CardFooter className="bg-primary text-white"> { feed.date }</CardFooter>
                    </Card>
                </div>
            )
        })
         return (
                <>
                    <div className="container" >
                        <div className="row">
                            <div className="col-12 col-md-10" >
                                <h1>Latest Posts</h1>
                                <div className="row" style={{overflowY: "scroll"}}>
                                    {feeds}
                                </div>
                            </div>
                            <div className="col-12 col-md-2">
                                <h1 className="text-center">Create</h1>
                            </div>
                        </div>
                    </div>
                </>
         )
     }
 };
 