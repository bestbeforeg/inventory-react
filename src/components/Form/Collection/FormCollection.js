import React from 'react';

const FormCollection = () => {
    return (
        <>
            <div className="col s12 m12">
                <div>Select operation</div>
                <p>
                    <label>
                        <input name="type" type="radio" />
                        <span>Ingoing</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="type" type="radio" />
                        <span>Outgoing</span>
                    </label>
                </p>
            </div>
            <div className="input-field col s12 m12">
                <input placeholder="Quantity" id="quantity" type="text" className="validate"/>
                <label htmlFor="quantity">Quantity</label>
            </div>
            <div className="input-field col s12 m12">
                <input placeholder="Price" id="price" type="text" className="validate"/>
                <label htmlFor="price">Price</label>
            </div>
            <div className="input-field col s12 m12">
                <input placeholder="Document" id="document" type="text" className="validate"/>
                <label htmlFor="document">Document</label>
            </div>
            <div className="input-field col s12 m12">
                <input placeholder="Company" id="company" type="text" className="validate"/>
                <label htmlFor="company">Company</label>
            </div>
            <div className="col s12 m12">
                <div className="switch">
                    <div>Set current date</div>
                    <label>
                        Off
                        <input type="checkbox" />
                        <span className="lever"></span>
                        On
                    </label>
                </div>
            </div>
            <div className="input-field col s12 m12">
                <input placeholder="Date" id="date" type="text" className="validate"/>
                <label htmlFor="date">Date</label>
            </div>
        </>
    )
};

export default FormCollection;