import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import M from 'materialize-css';

class Navigation extends React.Component {

  // document.addEventListener('DOMContentLoaded', function() {
  //   const mobileMenu = document.getElementById('mobile-menu');
  //   M.Sidenav.init(mobileMenu);
  // });

  componentDidMount(){
    M.Sidenav.init(this.mobileMenu);
  }

  render() {
    return (
      <div className="row">
        <nav className="nav-wrapper grey darken-3">
          <div className="container row s12 m12">
            <Link to='/' className="brand-logo">
              TE91
            </Link>
            <a href="#!" data-target="mobile-menu" className="sidenav-trigger hide-on-med-and-up"><i
              className="material-icons">menu</i></a>
            <ul className="right hide-on-small-only">
              <li><NavLink to='/'>Create new</NavLink></li>
              <li><NavLink to='/browse'>Browse</NavLink></li>
              {/*<li><NavLink to='/signin'>Logout</NavLink></li>*/}
              <li><NavLink to='/' className="btn btn-floating blue lighten-1">ZD</NavLink></li>
            </ul>

          </div>
          <ul ref={ (mobileMenu) => {this.mobileMenu = mobileMenu} } className="sidenav" id="mobile-menu">
            <li><NavLink to='/'>Create new</NavLink></li>
            <li><NavLink to='/browse'>Browse</NavLink></li>
          </ul>
        </nav>
      </div>
    )
  }
};

export default Navigation;