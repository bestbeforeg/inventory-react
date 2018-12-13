const EditCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_CATEGORY':
            console.log('edit category', action.category);
            return state;
        case 'EDIT_CATEGORY_ERROR':
            console.log('edit category error', action.error);
            return state;
        default:
            return state;
    }
};

export default EditCategoryReducer;