import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import "./styles.css";

export default function Menu() {
  const history = useHistory();
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/url" className="nav-link active">
                Urls
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link active">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
