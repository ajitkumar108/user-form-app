import React from "react";
import { Link } from "react-router-dom";  // ✅ Import Link

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand me-3" href="/">MERN</a>
        <div className="collapse navbar-collapse d-flex">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item me-3">
              <Link to="/" className="nav-link">
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/all">
                All Posts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
