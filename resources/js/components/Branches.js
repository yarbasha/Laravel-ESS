import React from 'react';
import { Link, useLocation, Route } from 'react-router-dom';
import CreateBranch from './CreateBranch';

export default function Branches() {
  return (
    <div className="page">
      <h1>Branches</h1>
      <Link to={{ pathname: '/branches/create' }}>Create Branch</Link>
      {<Route path='/branches/create' children={<CreateBranch />} />}
    </div>
  );
}