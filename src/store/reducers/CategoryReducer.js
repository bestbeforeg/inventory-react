const initState = {
    // categories: [
    //     {id: 1, name: 'Импулсни регулатори', parent: '0', type: 0},
    //     {id: 2, name: 'Контактори', parent: '0', type: 0},
    //     {id: 3, name: 'DC 007', parent: '2', type: 1}
    // ]
};

const CategoryReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CATEGORY':
            console.log('created project', action.category);
            return state;
        case 'CREATE_CATEGORY_ERROR':
            console.log('created project error', action.error);
            return state;
        default:
            return state;
    }
};

export default CategoryReducer;