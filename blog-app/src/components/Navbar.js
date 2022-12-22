import { useLogout } from "../hooks/useLogout";

import { useAuthContext } from "../hooks/useAuthContext";
import { Register } from "./Register";

import { Link } from "react-router-dom";

export function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  console.log("NAVBAAAR USER", user);

  const handleLogoutClick = async () => {
    await logout();
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">
            Blogster
          </a>
          {user && (
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/new" class="nav-link " aria-current="page" href="#">
                  New Post
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/blog" class="nav-link" href="#">
                  My Blog
                </Link>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link "
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                  onClick={handleLogoutClick}
                >
                  Logout
                </a>
              </li>
            </ul>
          )}

          {!user && (
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/register" class="nav-link " aria-current="page">
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/login" class="nav-link" href="#">
                  Login
                </Link>
              </li>
            </ul>
          )}
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
