import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {BrowseCategory} from './BrowseCategory';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createNestedMenu (arr, parent) {
    let out = [];
    for (let i in arr) {
      if (arr[i].parent === parent) {
        const link = `${arr[i].type === '0' ? 'category' : 'collection'}/${arr[i].type}/${arr[i].id}/${arr[i].name}/${arr[i].parent}`;
        const children = this.createNestedMenu(arr, arr[i].id);
        const li = <BrowseCategory key={arr[i].id} link={link} name={arr[i].name}>{Object.keys(children).length > 0 && children}</BrowseCategory>;
        out.push(li);
      }
    }

    return out;
  }

  render () {
    return (
      <div className='details container'>
        <div className='row'>
          <div className='col s12 m12'>
            <div className='card-panel light-grey lighten-4'>
              <h5 className='card-title'>Browse</h5>
              {this.props.categories &&
              this.props.categories.length > 0 ?
                <ul className='menu'>
                  {this.createNestedMenu(this.props.categories, '0')}
                </ul>
                : <h6>No data</h6>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories
  }
};

export default compose(
  connect(MapStateToProps),
  firestoreConnect([
    {collection: 'categories'}
  ]),
)(Browse);
