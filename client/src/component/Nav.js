import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul style={{display:"flex", float:"left",listStyle: "none",gap:"20px" 
}}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/alluser">All Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
