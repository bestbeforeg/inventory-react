import React from 'react';
import './FormCollection.css';
import {getFirestore} from "redux-firestore";
import M from "materialize-css";
import {createCategory} from "../../../store/actions/ActionCategory";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {firestoreConnect} from "react-redux-firebase";
import moment from "moment";

class FormCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      loading: false,
      operation: 'ingoing',
      quantity: '',
      price: '',
      document: '',
      company: '',
      date: moment(moment().valueOf()).format("DD.M.YYYY"),
      isCurrentDate: true,
    };

    this.firestore = getFirestore();
    this.collectionId = this.props.match.params.id;
    this.collectionName =  this.props.match.params.name;
  }

  createInitialFormData = () => {
    this.setState({
      operation: 'ingoing',
      quantity: '',
      price: '',
      document: '',
      company: '',
      date: moment(moment().valueOf()).format("DD.M.YYYY"),
    }, () => {M.updateTextFields()});
  };

  componentDidMount(){
    this.setState({
      data: this.detailsCollection(this.collectionId)
    });
  }

  detailsCollection(id){
    let data = [];
    console.log("id = ", id);
    this.firestore.collection("collections").where("parent", "==", id)
      .get()
      .then((querySnapshot) => {
        console.log("querySnapshot = ", querySnapshot );
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id,...doc.data()});
        });
        this.setState({
          data: data,
          loading: false,
        }, () => {this.createInitialFormData()});
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    return data;
  };

  deleteEntry(e, id){
    e.preventDefault();
    this.firestore.collection("collections").doc(id).delete().then(() => {
      this.detailsCollection(this.collectionId);
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  createRow(item) {
    const curTotal = (Number(item.quantity) * Number(item.price));
    return (
      <tr key={item.id}>
        <td>{item.operation}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.document}</td>
        <td>{ moment(item.date).format("DD.MM.YYYY") }</td>
        <td>{item.company}</td>
        <td>{ curTotal.toFixed(2) } lv</td>
        <td>
          <button onClick={(e) => {this.deleteEntry(e, item.id)}} className="btn-floating btn-large waves-effect waves-light red">
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    )
  };

  renderDetailsRows(details) {
    let totalPriceOut = 0;
    let totalQuantityOut = 0;
    let totalPriceIn = 0;
    let totalQuantityIn = 0;

    const rowsDetails = details.map((item) => {
      if(item.operation === 'ingoing'){
        totalQuantityIn += Number(item.quantity);
        totalPriceIn += Number(item.quantity) * Number(item.price);
      } else {
        totalQuantityOut += Number(item.quantity);
        totalPriceOut += Number(item.quantity) * Number(item.price);
      }
        return this.createRow(item);
      }
    );

    return (
      <>
        <tbody>
        {rowsDetails}
          <tr>
            <td colSpan="7">Total price ingoing</td>
            <td>{totalPriceIn} lv</td>
          </tr>
          <tr>
            <td colSpan="7">Total quantity ingoing</td>
            <td>{totalQuantityIn}</td>
          </tr>
          <tr>
            <td colSpan="7">Total price outgoing</td>
            <td>{totalPriceOut} lv</td>
          </tr>
          <tr>
            <td colSpan="7">Total quantity outgoing</td>
            <td>{totalQuantityOut}</td>
          </tr>
        </tbody>
      </>
    );
  };

  handleChange = (e, propName) => {
    const property = propName ? propName : e.target.id;
    this.setState({
      [property]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      operation: this.state.operation,
      price: this.state.price,
      quantity: this.state.quantity,
      document: this.state.document,
      company: this.state.company,
      date: moment(this.state.date, "DD.M.YYYY").valueOf(),
      createdAt: moment().valueOf(),
      parent: this.props.match.params.id,
    };

    console.log("data to send = ", dataToSend);

    const firestore = getFirestore();
    firestore.collection("collections")
      .add(dataToSend)
      .then( (docRef) => {
        console.log(`${docRef} created`);
        this.detailsCollection(this.collectionId);
      })
      .catch( (error) => {
        console.error("Error adding document: ", error);
      });
  };

  toggleDateVisivility = () => {
    this.setState({isCurrentDate: !this.state.isCurrentDate}, () => {M.updateTextFields()});
  };

    render() {
      return (
        <div className='details container'>
          <form onSubmit={(e) => {this.handleSubmit(e)}}>
            <div className="row">
              <div className="col s12 m12">
                <div className="card light-grey lighten-4">
                  <div className="card-content">
                    <div className="row">
                      {this.state.data.length > 0 ?
                        <>
                          <h5 className="card-title">{this.collectionName}</h5>
                          <table className="collection highlight responsive-table">
                            <thead>
                            <tr>
                              <th>Operation</th>
                              <th>Price (lv)</th>
                              <th>Quantity</th>
                              <th>Document</th>
                              <th>Date</th>
                              <th>Company</th>
                              <th>Total</th>
                              <th>Actions</th>
                            </tr>
                            </thead>
                            {this.renderDetailsRows(this.state.data)}
                          </table>
                        </> :
                        <>
                          <h5 className="card-title">{this.collectionName}</h5>
                          <h6>No data</h6>
                        </>
                      }
                    </div>
                    <div className="row">
                      <div className="col s12 m12">
                        <div>Select type</div>
                        <p>
                          <label>
                            <input name="operation" type="radio" checked={this.state.operation === 'ingoing'}
                                   onChange={(e) => {this.handleChange(e, 'operation')}} value={'ingoing'} />
                            <span>Ingoing</span>
                          </label>
                          <label>
                            <input name="operation" type="radio" checked={this.state.operation === 'outgoing'}
                                   onChange={(e) => {this.handleChange(e, 'operation')}} value={'outgoing'} />
                            <span>Outgoing</span>
                          </label>
                        </p>
                      </div>
                      <div className="input-field col s6 m6">
                        <input id="quantity" type="text" className="validate" value={this.state.quantity} onChange={this.handleChange} />
                        <label htmlFor="quantity">Quantity</label>
                      </div>
                      <div className="input-field col s6 m6">
                        <input id="price" type="text" className="validate" value={this.state.price} onChange={this.handleChange}/>
                        <label htmlFor="price">Price</label>
                      </div>
                      <div className="input-field col s6 m6">
                        <input id="document" type="text" className="validate" value={this.state.document} onChange={this.handleChange}/>
                        <label htmlFor="document">Document</label>
                      </div>
                      <div className="input-field col s6 m6">
                        <input id="company" type="text" className="validate" value={this.state.company} onChange={this.handleChange}/>
                        <label htmlFor="company">Company</label>
                      </div>
                      <div className="col s6 m6">
                        <div className="switch">
                          <div>Set current date</div>
                          <label>
                            Off
                            <input type="checkbox" checked={this.state.isCurrentDate}
                                   onChange={this.toggleDateVisivility}/>
                            <span className="lever"></span>
                            On
                          </label>
                        </div>
                      </div>
                      {
                        !this.state.isCurrentDate ?
                          <div className="date input-field col s6 m6">
                            <input id="date" type="text" className="validate"
                                   value={this.state.date}
                                   onChange={this.handleChange}/>
                            <label htmlFor="date">Date</label>
                          </div> :
                          null
                      }
                    </div>
                  </div>
                  <div className="card-action right-align">
                    <button className="btn waves-effect waves-light" type="submit" name="action">Add
                      <i className="material-icons right">check</i>
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
)(FormCollection);