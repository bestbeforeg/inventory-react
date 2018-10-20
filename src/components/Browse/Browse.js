import React from 'react';
import Category from "../Details/Category/Category";
import Collection from "../Details/Collection/Collection";

const Browse = () => {
    return (
        <div className="details container">
            <div className="row">
                <div className="col s12 m12">
                    <div className="card-panel light-grey lighten-4">
                        <span className="card-title">Browse</span>
                        <ul className="data-tree">
                            <li className="collection-item">Alvin</li>
                            <li className="collection-item">
                                <ul className="">
                                    <li className="collection-item">Alvin</li>
                                    <li className="collection-item">Alvin</li>
                                    <li className="collection-item">
                                        <ul className="">
                                            <li className="collection-item">Alvin</li>
                                            <li className="collection-item">Alvin</li>
                                            <li className="collection-item">Alvin</li>
                                            <li className="collection-item">Alvin</li>
                                        </ul>
                                    </li>
                                    <li className="collection-item">Alvin</li>
                                </ul>
                            </li>
                            <li className="collection-item">Alvin</li>
                            <li className="collection-item">Alvin</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Browse;
