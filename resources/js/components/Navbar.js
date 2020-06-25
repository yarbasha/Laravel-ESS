import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store/actions/actions';
import { connect } from 'react-redux';

const Navbar = (props) => {

  const handleLogout = (event) => {
    event.preventDefault();
    props.logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar" aria-controls="Navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="Navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink activeClassName="active" to="/items" className="nav-link">Items</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/branches" className="nav-link">Branches</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/contact-us" className="nav-link">Contact Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/about-us" className="nav-link">About Us</NavLink>
          </li>
          {
            props.isLogged ? (<>
              <li className="nav-item">
                <NavLink activeClassName="active" to="/logout" className="nav-link" onClick={handleLogout}>Logout</NavLink>
              </li>
              <li className="nav-item">
                <span className="navbar-text">{props.user && props.user.name}</span>
              </li>
            </>) : (<>
              <li className="nav-item">
                <NavLink activeClassName="active" to="/login" className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" to="/register" className="nav-link">Register</NavLink>
              </li>
            </>)
          }
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    user: authReducer.user,
    isLogged: authReducer.isLogged
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
