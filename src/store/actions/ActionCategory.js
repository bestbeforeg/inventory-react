import history from "../../components/Utils/History/UtilsHistory";

export const createCategory = (entry) => {
  console.log('category = ', entry);
  let {id, ...category} = entry;

  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
      console.log('id = ', id);
      firestore.collection('categories').doc(id).set({
          ...category
      }, { merge: true }).then(() => {
        dispatch({type: 'CREATE_CATEGORY', category});
        // const path = `/${category.type === '0' ? 'category' : 'collection'}/${category.type}/${id}/${category.name}/${category.parent}`;
        // history.push(path);
      }).catch((error) => {
          dispatch({type: 'CREATE_CATEGORY_ERROR', error})
      });
    }
};
