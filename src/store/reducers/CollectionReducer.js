const CollectionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_COLLECTION':
            console.log('created collection', action.category);
            return state;
        case 'CREATE_CATEGORY_ERROR':
            console.log('created collection error', action.error);
            return state;
        default:
            return state;
    }
};

export default CollectionReducer;