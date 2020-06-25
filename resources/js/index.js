import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Branches from './components/Branches';
import Users from './components/Users';
import Items from './components/Items';
import Home from './components/Home';
import ItemDetails from './components/ItemDetails';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import Cookie from 'js-cookie';
import { fetchUserSuccess, fetchUserFailure } from './store/actions/actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class Index extends Component {
  render() {
    console.log(this.props);
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Navbar />
            <div className="row">
              <div className="col-md-3" style={{ zIndex: 1 }}>
                <Sidebar />
              </div>
              <div className="col-md-9">
                <Route render={({ location }) => (
                  <TransitionGroup>
                    <CSSTransition key={location.key} timeout={800} classNames="pageSlider">
                      <Switch location={location}>
                        <Route path="/" exact component={Home} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route path="/contact-us" component={ContactUs} />
                        <Route path="/branches" component={Branches} />
                        <PrivateRoute path="/users" component={Users} />
                        <Route path="/items/:id/details" component={ItemDetails} />
                        <Route path="/items" component={Items} />
                        <GuestRoute path="/login" component={Login} />
                        <GuestRoute path="/register" component={Register} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )} />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

if (document.getElementById('app')) {
  if (Cookie.get("token")) {
    axios.get('api/v1/auth/user').then(response => {
      store.dispatch(fetchUserSuccess(response.data.user));
      ReactDOM.render(<Index />, document.getElementById('app'));
    }).catch(error => {
      store.dispatch(fetchUserFailure());
      ReactDOM.render(<Index />, document.getElementById('app'));
    });
  } else {
    ReactDOM.render(<Index />, document.getElementById('app'));
  }
}
