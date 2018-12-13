import React from 'react';
import {getFirestore} from "redux-firestore";
import {Link} from "react-router-dom";
import history from "../../Utils/History/UtilsHistory";

class DetailsCategory extends React.Component {
  constructor(props) {
    console.log("props = ", props);
    super(props);
    this.state = {
      data: '',
      loading: true
    };
    this.firestore = getFirestore();


    this.categoryId = this.props.match.params.id;
    this.categoryName = this.props.match.params.name;
  }

  componentDidMount(){
    this.setState({data: this.detailsCategory(this.categoryId), loading: true});
  }

  componentWillReceiveProps(nextProps){
      this.categoryId = nextProps.match.params.id;
      this.categoryName = nextProps.match.params.name;
      this.setState({data: this.detailsCategory(this.categoryId), loading: true});
  }

  detailsCategory(id) {
    let data = [];
    this.firestore.collection("collections").where("parent", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((collection) => {
          data.push({id: collection.id, ...collection.data()});
        });
        this.firestore.collection("categories").where("parent", "==", id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((category) => {
              data.push({id: category.id, ...category.data()});
            });
            this.setState({
              data: data,
              loading: false,
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  createListItem(item) {
    console.log("item = ", item);
    const link = `/${item.type === '0' ? 'category' : 'collection'}/${item.type}/${item.id}/${item.name}/${item.parent}`;
    return (
      <li key={item.id} className="collection-item"><Link to={link}>{item.name}</Link></li>
    )
  };

  renderDetailsList(details) {
    const rowsDetails = details.map((row) =>
      this.createListItem(row)
    );

    return (
      <ul className="collection">
        {rowsDetails}
      </ul>
    );
  };

  editLink(e) {
    e.preventDefault();
    const categoryParent = this.props.match.params.parent;
    const categoryType =  this.props.match.params.type;
    const path = `/edit/${categoryType}/${this.categoryId}/${this.categoryName}/${categoryParent}`;
    history.push(path);
  }

  render() {
    return (
      <div className="details container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card light-grey lighten-4">
              <div className="card-content">
                <h5 className="card-title">{this.categoryName}</h5>
                {this.state.loading ? <h6>Loading...</h6> :
                  this.state.data &&
                  this.state.data.length > 0 ?
                  this.renderDetailsList(this.state.data)
                  :
                  <h6>No data</h6>
                }
              </div>
              <div className="card-action right-align">
                <button onClick={(e) => {this.editLink(e)}}  className="btn waves-effect waves-light" type="button">
                  Edit
                  <i className="material-icons right">edit</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailsCategory;
