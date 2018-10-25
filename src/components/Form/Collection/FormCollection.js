import React from 'react';
import Form from '../FormCollection';
import './FormCollection.css';

class FormCollection extends Form {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'ingoing',
            quantity: '',
            price: '',
            document: '',
            company: '',
            date: '',
            setCurDate: true,
        };
    }

    toggleDateVisivility = () => {
        const newValue = !this.state.setCurDate;
        this.setState({setCurDate: newValue});
        console.log('setCurDate = ', this.state.setCurDate);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card light-grey lighten-4">
                            <div className="card-content">
                                <h5 className="card-title">Add operation</h5>
                                <div className="row">
                                    <div className="col s12 m12">
                                        <div>Select type</div>
                                        <p>
                                            <label>
                                                <input name="operation" type="radio" checked={this.state.operation === 'ingoing'}
                                                       onChange={(e) => {this.handleChange(e, 'operation')}} value={'ingoing'} />
                                                <span>Ingoing</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input name="operation" type="radio" checked={this.state.operation === 'outgoing'}
                                                       onChange={(e) => {this.handleChange(e, 'operation')}} value={'outgoing'} />
                                                <span>Outgoing</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="input-field col s12 m12">
                                        <input id="quantity" type="text" className="validate" onChange={this.handleChange} />
                                        <label htmlFor="quantity">Quantity</label>
                                    </div>
                                    <div className="input-field col s12 m12">
                                        <input id="price" type="text" className="validate" onChange={this.handleChange}/>
                                        <label htmlFor="price">Price</label>
                                    </div>
                                    <div className="input-field col s12 m12">
                                        <input id="document" type="text" className="validate" onChange={this.handleChange}/>
                                        <label htmlFor="document">Document</label>
                                    </div>
                                    <div className="input-field col s12 m12">
                                        <input id="company" type="text" className="validate" onChange={this.handleChange}/>
                                        <label htmlFor="company">Company</label>
                                    </div>
                                    <div className="col s12 m12">
                                        <div className="switch">
                                            <div>Set current date</div>
                                            <label>
                                                Off
                                                <input type="checkbox" checked={this.state.setCurDate}
                                                       onChange={this.toggleDateVisivility}/>
                                                <span className="lever"></span>
                                                On
                                            </label>
                                        </div>
                                    </div>
                                    {
                                        !this.state.setCurDate ?
                                            <div className="date input-field col s12 m12">
                                                <input id="date" type="text" className="validate"
                                                       value={this.state.date}
                                                       onChange={this.handleChange}/>
                                                <label htmlFor="date">Date</label>
                                            </div> :
                                            null
                                    }
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
    }
}

export default FormCollection;