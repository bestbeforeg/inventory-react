import AuthReducer from './AuthReducer';
import CategoryReducer from './CategoryReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const RootReducer = combineReducers({
    auth: AuthReducer,
    categories: CategoryReducer,
    firestore: firestoreReducer,
});

export default RootReducer;