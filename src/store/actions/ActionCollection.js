export const createCollection = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('categories').add({
            ...category
        }).then((data) => {
            firestore.collection('collections').add(data.id).set({})
                .then(() => {dispatch({type: 'CREATE_COLLECTION', category})})
                .catch((error) => {dispatch({type: 'CREATE_COLLECTION_ERROR', error})})
        }).catch((error) => {
            dispatch({type: 'CREATE_COLLECTION_ERROR', error})
        });
    }
};