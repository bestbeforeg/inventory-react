import React from 'react';
import {sortAlphaNum} from "../Utils/Utils";
import FormCreate from "../Form/Create/FormCreate";
import M from "materialize-css";
import firebase from '../../config/fbConfig';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      categories: [],
    };
  }

  getAllCategories = () => {
    return this.state.categories
      .filter((category) => { return category.type === '0' && category.id !== this.props.match.id})
      .sort( (a, b) => (sortAlphaNum(a.name, b.name)))
      .map(category => category);
  };

  componentDidMount() {
    const categoriesRef = firebase.firestore().collection('categories');
    categoriesRef.onSnapshot((snapshot) => {
      console.log("snapshot?", snapshot);
      let categories = snapshot.docs;
      let newState = [];
      for (let category of categories) {
        const categoryData = category.data();
        newState.push({
          id: category.id,
          name: categoryData.name,
          parent: categoryData.parent,
          type: categoryData.type,
        });
      }
      this.setState({
        categories: newState
      });
    });
  }

  submitEntryToDB = (entry) => {
    console.log("entry = ", entry);

    firebase.firestore().collection('categories')
      .add(entry)
      .then(() => {
        M.toast({html: `Successfully created ${entry.name}`}
      )}
      );


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
    console.log("what is passed", this.getAllCategories());
    return (
        <FormCreate onSubmit={this.submitEntryToDB} categories={this.getAllCategories()} />
    )
  }
}

export default Create;