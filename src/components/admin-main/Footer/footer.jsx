import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer
        className="main-footer d-flex p-2 px-3 bg-white border-top">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Blog
            </Link>
          </li>
        </ul>
        <span className="copyright ml-auto my-auto mr-2">Copyright © 2018</span>
      </footer>
    </>
  );
}

export default Footer;
