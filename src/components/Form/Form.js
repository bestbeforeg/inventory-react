import React from 'react';
import {createCategory} from '../../store/actions/ActionCategory';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import M from 'materialize-css';
import {getFlatChildren, getNestedChildren, renderSelectOptions} from '../Utils/Utils';
import {v4 as uuid} from "uuid";
import { getFirestore } from 'redux-firestore';
import history from "../Utils/History/UtilsHistory";

class Form extends React.Component {
  constructor(props) {
    console.log("constructor props = ", props);
    super(props);
    this.state = {
      id: uuid(),
      name: '',
      type: '0',
      parent: '0',
    };
  }

  componentDidMount(){
    this.updateStateFields(this.props);
    M.FormSelect.init(this.select);
    M.updateTextFields();
  }

  componentWillReceiveProps(nextProps){
    this.updateStateFields(nextProps);
    M.updateTextFields();
    M.FormSelect.init(this.select);
  }

  componentDidUpdate(){
    M.updateTextFields();
    M.FormSelect.init(this.select);
  }

  updateStateFields(props){
    const params = props.match.params;
    if(params.parent) {
      this.setState({
        id: params.id,
        name: params.name,
        type: params.type,
        parent: params.parent,
      });
    } else {
      this.setState({
        id: uuid(),
        name: '',
        type: '0',
        parent: '0',
      })
    }
  }

  handleInputChange = (e, propName) => {
    const property = propName ? propName : e.target.id;
    this.setState({
        [property]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.assign({}, this.state);
    console.log("data on submit = ", data);
    this.props.createCategory(data);
    this.setState({
      id: uuid(),
      name: '',
      type: '0',
      parent: '0',
    });
  };

  addEntry = (e) => {
    const path = `/add/${this.props.match.params.type}/${this.props.match.params.id}/${this.props.match.params.name}/${this.props.match.params.parent}`;
    history.push(path);
  };

  deleteEntry = async (e, id) => {
    e.preventDefault();
    const firestore = getFirestore();
    const batch = firestore.batch();
    const idRef = firestore.collection('categories').doc(id);
    batch.delete(idRef);

    const objectsToDelete = getFlatChildren(getNestedChildren(this.props.categories, id), id);
    const collectionsPromises = await [];
    objectsToDelete.forEach( async (child) => {
      if(child.type === '1'){
        const collectionPromise = firestore.collection("collections").where("parent", "==", child.id).get();
        collectionsPromises.push(collectionPromise)
      }
      const childRef = firestore.collection("categories").doc(child.id);
      batch.delete(childRef);
    });

    Promise.all(collectionsPromises).then((collection) => {
        collection.forEach((snapshot) => {
          snapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
        });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      batch.commit().then(()=>{
        console.log("deleted");
      });
    });
  };

  render () {
    console.log("this.props.categories = ", this.props.categories);
    return (
      <div className='details container'>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 m12">
              <div className="card light-grey lighten-4">
                <div className="card-content">
                    <h5 className="card-title">{this.props.match.params.parent ? 'Edit': 'Create new entry'}</h5>
                  <div className="row">
                    {!this.props.match.params.parent &&
                      <div className="col s12 m12">
                        <div>Select type</div>
                        <p>
                          <label>
                            <input name="type" type="radio" checked={this.state.type === '0'}
                                   onChange={(e) => {
                                     this.handleInputChange(e, 'type')
                                   }} value={0}/>
                            <span>Category</span>
                          </label>
                        </p>
                        <p>
                          <label>
                            <input name="type" type="radio" checked={this.state.type === '1'}
                                   onChange={(e) => {
                                     this.handleInputChange(e, 'type')
                                   }} value={1}/>
                            <span>Collection</span>
                          </label>
                        </p>
                      </div>
                    }
                    <div className="input-field col s12 m12">
                      <input id="name" type="text" className="validate"
                             defaultValue={this.state.name}
                             onChange={this.handleInputChange}/>
                      <label htmlFor="name">Name</label>
                    </div>
                    {this.props.categories &&
                    <div className="input-field col s12">
                      <select id="parent" ref={ (select) => {this.select = select} }
                              value={this.state.parent}
                              onChange={this.handleInputChange}>
                        <option value="0">Root</option>
                        {renderSelectOptions(this.props.categories, this.state.id)}
                      </select>
                      <label>Select parent category</label>
                    </div>
                    }
                  </div>
                </div>
                <div className="card-action right-align">
                  <button className="btn waves-effect waves-light" type="submit" name="action">
                    {this.props.match.params.parent ? 'Save': 'Create'}
                    <i className="material-icons right">check</i>
                  </button>&nbsp;
                  {this.props.match.params.type === '1' &&
                  <button onClick={(e) => {this.addEntry(e)}} className="btn waves-effect waves-light" name="action">
                    Add
                    <i className="material-icons right">add</i>
                  </button>
                  }
                  &nbsp;
                  {this.props.match.params.parent &&
                    <button onClick={(e) => {this.deleteEntry(e, this.props.match.params.id)}} className="btn waves-effect waves-light red" name="action">
                      Delete
                      <i className="material-icons right">delete</i>
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const MapDispatchToProps = (dispatch) => {
    return {
        createCategory: (category) => { dispatch(createCategory(category))  }
    }
};

const MapStateToProps = (state) => {
    return {
        categories: state.firestore.ordered.categories
    }
};


export default compose(
    connect(MapStateToProps, MapDispatchToProps),
    firestoreConnect([
        {collection: 'categories'}
    ]),
)(Form);