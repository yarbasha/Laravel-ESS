import React from 'react';
import { connect } from 'react-redux';

function Home(props) {
  return (
    <div className="page">
      <div style={{ minHeight: '400px' }} className="row align-items-center justify-content-center">
        <h1>Welcome to Eyewear Store System</h1>
        {props.user && <h1>{props.user.name}</h1>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home);