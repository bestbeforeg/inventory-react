import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Browse extends React.Component{
    createLink = (item) => {
        const link = item.type === 0 ? '/category/' : '/collection/';
        // link += item.id;
        return  <li className='collection-item' key={item.id}>
                <NavLink to={`${link}${item.id}`}>{item.name}</NavLink>
            </li>
    };

    renderCategoriesList(props) {
        const categories = props.categories;
        const listCategories = categories.map((category) =>
            this.createLink(category)
        );

        return (
            <ul className="categories">
                {listCategories}
            </ul>
        );
    };

    componentWillReceiveProps(nextProps, nextState){
        this.renderCategoriesList(nextProps);
    }

    render() {
        console.log('categories', this.props.categories);
        return (
            <div className="details container">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card-panel light-grey lighten-4">
                            <h5 className="card-title">Browse</h5>
                                {this.props.categories ?
                                    this.renderCategoriesList(this.props) :
                                    <h6>No categories</h6>
                                }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const MapStateToProps = (state) => {
    console.log(state);
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
