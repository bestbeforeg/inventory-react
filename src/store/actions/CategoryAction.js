export const createCategory = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('categories').add({
            ...category
        }).then(() => {
            dispatch({type: 'CREATE_CATEGORY', category})
        }).catch((error) => {
            dispatch({type: 'CREATE_CATEGORY_ERROR', error})
        });
    }
};