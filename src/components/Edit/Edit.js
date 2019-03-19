import React from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {firestoreConnect} from "react-redux-firebase";
import {sortAlphaNum} from "../Utils/Utils";
import {createCategory} from "../../store/actions/ActionCategory";
import FormEdit from "../Form/Edit/FormEdit";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
  }

  getAllCategories = () => {
    return this.props.categories
      .filter((category) => { return category.type === '0' && category.id !== this.props.match.id})
      .sort( (a, b) => (sortAlphaNum(a.name, b.name)))
      .map(category => category);
  };

  submitEntryToDB = (entry) => {
    console.log("entry = ", entry);
    // const firestore = getFirestore();
    // firestore.collection('categories').doc(id).set({
    //   ...category
    // }, {merge: true}).then(() => {
    //   dispatch({type: 'CREATE_CATEGORY', category});
    //   // const path = `/${category.type === '0' ? 'category' : 'collection'}/${category.type}/${id}/${category.name}/${category.parent}`;
    //   // history.push(path);
    // }).catch((error) => {
    //   dispatch({type: 'CREATE_CATEGORY_ERROR', error})
    // });
  };


  render() {
    console.log("this.props.categories = ", this.props.categories);
    // const categories = this.getAllCategories();
    return (
      <>
      {this.props.categories &&
        <FormEdit onSubmit={this.submitEntryToDB} name={this.props.match.params.name} parent={this.props.match.params.parent} categories={this.getAllCategories()} />}
      </>
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
)(Edit);