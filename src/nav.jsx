import { Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  return (
    <nav>
      <img src="/pokemon-logo.png" alt="Pokemon Logo" />
      <div className="nav-links">
        <div className="nav-items">
          <h2 >Home</h2>
          <h2 >Pokemon Gaming Hub!</h2>
        </div>
        </div>
    </nav>
  );
};

export default Nav;

