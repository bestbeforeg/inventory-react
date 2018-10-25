import React, { Component } from 'react';
import DetailsCategory from './Category/DetailsCategory';
import DetailsCollection from './Collection/DetailsCollection';

class Details extends Component {
    render(){
        return (
            <div className="details container">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card light-grey lighten-4">
                            <div className="card-content">
                                <span className="card-title">Details</span>
                                <DetailsCategory/>
                                <DetailsCollection/>
                            </div>
                            <div className="card-action">
                                <button className="waves-effect waves-light btn">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;