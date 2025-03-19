import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const Header = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    My React App
                </a>
                <div className="ml-auto">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    </>
  );
};

export default Header;
