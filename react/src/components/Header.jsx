import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const Header = ({loggedInUser}) => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    RoloNet
                </a>

                <div className="ml-auto">
                    <Link className="nav-link" to="/predictSalary">
                        Predict Salary
                    </Link>
                </div>

                {loggedInUser ? <>
                    <div className="ml-auto">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </div>
                </>
                :
                <>
                    <div className="ml-auto">
                    <Link className="nav-link" to="/login">
                        Logout
                    </Link>
                </div>
                </>}
            </div>
        </nav>
    </>
  );
};

export default Header;
