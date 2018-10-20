import React from 'react';
import FormCollection from './Collection/FormCollection';

const Form = () => {


    return (
            <form>
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card light-grey lighten-4">
                            <div className="card-content">
                                <span className="card-title">Add/Edit</span>
                                <div className="row">
                                    <div className="col s12 m12">
                                        <div>Select entry type</div>
                                        <p>
                                            <label>
                                                <input name="entry-type" type="radio" />
                                                <span>Category</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input name="entry-type" type="radio" />
                                                <span>Collection</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="input-field col s12 m12">
                                        <input placeholder="Name" id="name" type="text" className="validate"/>
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <select>
                                            <option value="" disabled defaultValue="0">Choose your option</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </select>
                                        <label>Select parent category</label>
                                    </div>
                                    <FormCollection/>
                                </div>
                            </div>
                            <div className="card-action">
                                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    )
};

export default Form;