import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <h2>JobX360</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navigation;
         