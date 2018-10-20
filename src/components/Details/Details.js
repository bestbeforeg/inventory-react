import React, { Component } from 'react';
import Category from './Category/Category';
import Collection from './Collection/Collection';

class Details extends Component {
    render(){
        return (
            <div className="details container">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card light-grey lighten-4">
                            <div className="card-content">
                                <span className="card-title">Details</span>
                                <Category/>
                                <Collection/>
                            </div>
                            <div className="card-action">
                                <a className="waves-effect waves-light btn">Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;