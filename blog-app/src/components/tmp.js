import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { InputSuggestions } from "react-input-suggestions";

export function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5153/auth/search/" + query, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const json = await res.json();

      setSearchData(json.map((x) => x.username));
    };

    if (query !== "") fetchUsers();

    console.log(searchData);
  }, [query]);

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
            <InputSuggestions
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                console.log(e.target.value);
                setQuery(e.target.value);
              }}
              suggestions={searchData}
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
