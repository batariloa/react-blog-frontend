import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { InputSuggestions } from "react-input-suggestions";
import { useNavigate } from "react-router-dom";

import "./css/Navbar.css";
import { url } from "../global/variables";
import { isAdmin } from "../util/isAdmin";
import axiosClient from "../http/axios";
export function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  //search users
  useEffect(() => {
    const fetchUsers = async () => {
      await axiosClient.post(url + "/auth/search/" + query).then((response) => {
        setSearchData(response.data.map((x) => x.username));
      });
    };

    if (query !== "") fetchUsers();
  }, [query]);

  //logout
  const handleLogoutClick = async () => {
    await logout();
  };

  //jsx
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      {" "}
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a href="/" className="navbar-brand">
            Blogster
          </a>
          {user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li key="newPost" className="nav-item">
                <Link
                  to="/new"
                  className="nav-link "
                  aria-current="page"
                  href="#"
                >
                  New Post
                </Link>
              </li>
              <li key="myBlog" className="nav-item">
                <Link to="/blog" className="nav-link" href="#">
                  My Blog
                </Link>
              </li>

              <li key="logout" className="nav-item">
                <Link
                  className="nav-link "
                  aria-disabled="true"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Link>
              </li>
              {isAdmin(user) && (
                <Link
                  className="nav-link "
                  style={{ color: "red" }}
                  aria-disabled="true"
                >
                  Admin mode
                </Link>
              )}
            </ul>
          )}

          {!user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li key="register" className="nav-item">
                <Link to="/register" className="nav-link " aria-current="page">
                  Register
                </Link>
              </li>
              <li key="login" className="nav-item">
                <Link to="/login" className="nav-link" href="#">
                  Login
                </Link>
              </li>
            </ul>
          )}
          <form className="d-flex">
            <InputSuggestions
              className="form-control me-2 edit mt-1 mb-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              suggestions={searchData.map((x) => (
                <span onClick={() => navigate("/blog/" + x)}>{x}</span>
              ))}
            />
            <button className="btn btn-outline-success mt-1 mb-1" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
