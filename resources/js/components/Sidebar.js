import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = ["users", "items", "invoices", "orders", "branches", "categories", "insurances", "quantities"];
  return (
    <div className="list-group d-none d-md-block">
      {
        links.map((link, index) => (
          <NavLink to={`/${link}`} key={index} activeClassName="active" className="list-group-item list-group-item-action">
            <span style={{textTransform:'capitalize'}}>{link}</span>
          </NavLink>
        ))
      }
    </div>
  );
}