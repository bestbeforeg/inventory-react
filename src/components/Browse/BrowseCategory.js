import React from 'react';
import {Link} from 'react-router-dom';

export const BrowseCategory = (props) => {
  return (
    <ul className='collection'>
      <li className='collection-item'>
        <Link to={props.link}>{props.name}</Link>
        {props.children}
      </li>
    </ul>
  )
};