import AuthReducer from './AuthReducer';
import CreateCategoryReducer from './CreateCategoryReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import CollectionReducer from "./CollectionReducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    collection: CollectionReducer,
    categories: CreateCategoryReducer,
    firestore: firestoreReducer,
});

export default RootReducer;