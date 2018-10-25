import React from 'react';
import { createCategory } from '../../store/actions/CategoryAction';
import { connect } from 'react-redux';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";


class FormCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: 0,
            parent: '0',
        };
    }

    handleChange = (e, propName) => {
        const property = propName ? propName : e.target.id;
        this.setState({
            [property]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("state = ", this.state);
        this.props.createCategory(this.state);
    };

    renderSelectOptions(props) {
        const categories = props.categories;
        const options = categories.map((category) =>
            <option key={category.id} value={category.id}>{category.name}</option>
        );

        return (
            <select id="parent" className="browser-default" onChange={this.handleChange}>
                <option value="0">Root</option>
                {options}
            </select>
        );
    };

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card light-grey lighten-4">
                            <div className="card-content">
                                <h5 className="card-title">Add/Edit</h5>
                                <div className="row">
                                    <div className="col s12 m12">
                                        <div>Select entry type</div>
                                        <p>
                                            <label>
                                                <input name="type" type="radio" checked={this.state.type === '0'}
                                                       onChange={(e) => {this.handleChange(e, 'type')}} value={0} />
                                                <span>Category</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input name="type" type="radio" checked={this.state.type === '1'}
                                                       onChange={(e) => {this.handleChange(e, 'type')}} value={1}/>
                                                <span>Collection</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="input-field col s12 m12">
                                        <input id="name" type="text" className="validate" onChange={this.handleChange}/>
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    {this.props.categories &&
                                    <div className="input-field col s12">
                                        <label>Select parent category</label>
                                        {this.renderSelectOptions(this.props)}
                                    </div>
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

const MapDispatchToProps = (dispatch) => {
    return {
        createCategory: (category) => { dispatch(createCategory(category))  }
    }
};

const MapStateToProps = (state) => {
    console.log(state);
    return {
        categories: state.firestore.ordered.categories
    }
};


export default compose(
    connect(MapStateToProps, MapDispatchToProps),
    firestoreConnect([
        {collection: 'categories'}
    ]),
)(FormCollection);