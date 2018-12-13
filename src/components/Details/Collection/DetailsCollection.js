import React from 'react';
import {getFirestore} from "redux-firestore";
import history from "../../Utils/History/UtilsHistory";
import moment from "moment";

class DetailsCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      loading: false,
    };
    this.firestore = getFirestore();
    this.collectionId = this.props.match.params.id;
    this.collectionName = this.props.match.params.name;
  }

  componentDidMount(){
    this.setState({
      data: this.detailsCollection(this.collectionId)
    });
  }

  deleteEntry(id){
    this.firestore.collection("collections").doc(id).delete().then(() => {
      this.detailsCollection(this.collectionId);
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  detailsCollection(id) {
    let data = [];
    this.firestore.collection("collections").where("parent", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
        });
        this.setState({
          data: data,
          loading: false,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return data;
  };

  createRow(item) {
    return (
      <tr key={item.id}>
        <td>{item.operation}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td>{item.document}</td>
        <td>{moment(item.date).format("DD.MM.YYYY")}</td>
        <td>{item.company}</td>
        <td>{(Number(item.quantity) * Number(item.price)).toFixed(2)} lv</td>
        <td>
          <button onClick={() => {this.deleteEntry(item.id)}} className="btn-floating btn-large waves-effect waves-light red">
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

  editLink(e) {
    e.preventDefault();
    const collectionParent = this.props.match.params.parent;
    const collectionType = this.props.match.params.type;
    const path = `/edit/${collectionType}/${this.collectionId}/${this.collectionName}/${collectionParent}`;
    history.push(path);
  }

  render() {
    return (
      <div className="details container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card light-grey lighten-4">
              <div className="card-content">
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
              <div className="card-action right-align">
                <button onClick={(e) => {
                  this.editLink(e)
                }} className="btn waves-effect waves-light" type="button">
                  Edit
                  <i className="material-icons right">edit</i>
                </button>
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default DetailsCollection;