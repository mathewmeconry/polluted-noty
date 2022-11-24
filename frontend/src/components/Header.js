import {useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import userContext from "../contexts/userContext";

export default function Header() {
  const location = useLocation();
  const context = useContext(userContext);

  console.log(context.user);

  function renderPath(name, loc) {
    return (
      <li className="nav-item">
        <Link
          to={loc}
          className={`nav-link ${location.pathname === loc ? "active" : ""}`}
        >
          {name}
        </Link>
      </li>
    );
  }

  function renderLoggedIn() {
    if (context.user) {
      return (
        <>
          {renderPath("My Notes", "/notes")}
          {renderPath("New", "/new")}
          {renderPath("Profile", "/profile")}
        </>
      );
    }
    return (
      <>
        {renderPath("Login", "/login")}
        {renderPath("Register", "/register")}
      </>
    );
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <span className="fs-4">Noty</span>
        </Link>

        <ul className="nav nav-pills">{renderLoggedIn()}</ul>
      </header>
    </div>
  );
}
