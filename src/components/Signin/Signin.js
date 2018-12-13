import React, {Component} from 'react';

class Signin extends Component {
    state={
        email: '',
        password: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("state = ", this.state);
    };

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card light-grey lighten-4">
                            <div className="card-content">
                                <h5 className="card-title">Signin</h5>
                                <div className="row">
                                    <div className="input-field col s12 m12">
                                        <input id="email" type="email" className="validate" onChange={this.handleChange}/>
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-field col s12 m12">
                                        <input id="password" type="password" className="validate" onChange={this.handleChange}/>
                                        <label htmlFor="password">Password</label>
                                    </div>
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
        );
    }
}

export default Signin;