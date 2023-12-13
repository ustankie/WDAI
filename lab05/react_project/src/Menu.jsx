import { Outlet, Link } from "react-router-dom";
import React from "react";
import './Menu.css'


export const Menu = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hello">Hello World</Link>
          </li>
          <li>
            <Link to="/productlist">Product List</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};


