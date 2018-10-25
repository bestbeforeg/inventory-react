import React from 'react';

const DetailsCollection = (props) => {
    return (
        <div className="details container">
            <div className="row">
                <div className="col s12 m12">
                    <div className="card light-grey lighten-4">
                        <div className="card-content">
                            <h5 className="card-title">{props.match.params.id}</h5>
                            <table className="collection highlight responsive-table">
                                <thead>
                                <tr>
                                    <th>Operation</th>
                                    <th>Document</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>Company</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>ingoing</td>
                                    <td>doc1</td>
                                    <td>233 лв.</td>
                                    <td>2</td>
                                    <td>16-10-2018</td>
                                    <td>firma</td>
                                    <td>466 лв.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-action">
                            <button className="btn waves-effect waves-light" type="button">Edit
                                <i className="material-icons right">edit</i>
                            </button>
                            <button className="btn waves-effect waves-light" type="button">Delete
                                <i className="material-icons right">delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default  DetailsCollection;