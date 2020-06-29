import React, { Component } from 'react'
import HomeHeader from './HomeHeaderComponent'
import HomeBody from './HomeBodyComponent'

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <HomeHeader />
                <HomeBody />
            </React.Fragment>
        );
    }
};
