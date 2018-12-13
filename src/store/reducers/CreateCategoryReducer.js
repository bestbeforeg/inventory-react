const CreateCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_CATEGORY':
            console.log('created category', action.category);
            return state;
        case 'CREATE_CATEGORY_ERROR':
            console.log('created category error', action.error);
            return state;
        default:
            return state;
    }
};

export default CreateCategoryReducer;