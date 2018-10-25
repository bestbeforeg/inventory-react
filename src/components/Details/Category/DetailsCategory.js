import React from 'react';

const DetailsCategory = (props) => {
    console.log(props.match.params.id);
    return (
        <div className="details container">
            <div className="row">
                <div className="col s12 m12">
                    <div className="card light-grey lighten-4">
                        <div className="card-content">
                            <h5 className="card-title">{props.match.params.id}</h5>
                            {/*add content here*/}
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

export default  DetailsCategory;