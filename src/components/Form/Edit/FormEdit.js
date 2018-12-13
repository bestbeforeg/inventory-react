import React from 'react';
import M from 'materialize-css';
import {renderSelectOptions} from '../../Utils/Utils';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {firestoreConnect} from "react-redux-firebase";
import {editCategory} from "../../../store/actions/ActionCategory";


class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      parent: '0',
    };
  }

  componentDidMount(){
    this.setState({
      name: this.props.match.params.name,
      type: this.props.match.params.id,
      parent: this.props.match.params.parent,
    });
    M.FormSelect.init(this.select);
    M.updateTextFields();
  }

  componentDidUpdate(){
    M.FormSelect.init(this.select);
  }

  handleInputChange = (e, propName) => {
    const property = propName ? propName : e.target.id;
    this.setState({
        [property]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editCategory(this.state);
  };

  render () {
    console.log(this.state);
    this.props.categories && console.log("props", this.props.categories);
    return (
      <div className='details container'>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 m12">
              <div className="card light-grey lighten-4">
                <div className="card-content">
                  <h5 className="card-title">Add/Edit</h5>
                  <div className="row">
                    <div className="input-field col s12 m12">
                      <input className="validate" id="name" defaultValue={this.props.match.params.name} type="text"  onChange={this.handleInputChange}/>
                      <label htmlFor="name">Name</label>
                    </div>
                    {this.props.categories &&
                    <div className="input-field col s12">
                      <select  id="parent" ref={ (select) => {this.select = select} } defaultValue={this.props.match.params.parent} onChange={this.handleInputChange}>
                        <option value="0">Root</option>
                        {renderSelectOptions(this.props.categories)}
                      </select>
                      <label>Select parent category</label>
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
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories
  }
};

const MapDispatchToProps = (dispatch) => {
  return {
    editCategory: (category) => { dispatch(editCategory(category))  }
  }
};

export default compose(
  connect(MapStateToProps, MapDispatchToProps),
  firestoreConnect([
    {collection: 'categories'}
  ]),
)(FormEdit);