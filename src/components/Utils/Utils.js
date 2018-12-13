import React from "react";

export const sortAlphaNum = (a, b) => {
  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;
  const aA = a.replace(reA, '');
  const bA = b.replace(reA, '');
  if (aA === bA) {
    const aN = parseInt(a.replace(reN, ''), 10);
    const bN = parseInt(b.replace(reN, ''), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1
  } else {
    return aA.localeCompare(bA)
  }
};

export const getFlatChildren = (arr, parent) => {
  let out = [];
  for (let i in arr) {
    if (arr[i].parent === parent) {
      if(arr[i].children) {
        const children = getFlatChildren(arr[i].children, arr[i].id);
        out.push(...children);
      }
      out.push(arr[i]);
    }
  }
  return out;
};

export const getNestedChildren = (arr, parent) => {
  let out = [];
  for (let i in arr) {
    if (arr[i].parent === parent) {
      let children = getNestedChildren(arr, arr[i].id);
      if (Object.keys(children).length) {
        arr[i].children = children
      }
      out.push(arr[i]);
    }
  }
  return out;
};

export const renderSelectOptions = (objectList, currentId) => {
  console.log("objectlist = ", objectList);
  return objectList
    .filter((category) => { return category.type === '0' && category.id !== currentId})
    .sort( (a, b) => (sortAlphaNum(a.name, b.name)))
    .map((category) =>
      <option key={category.id} value={category.id}>{category.name}</option>
    );
};
