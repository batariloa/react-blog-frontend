import { useLogout } from "../hooks/useLogout";

import { useAuthContext } from "../hooks/useAuthContext";

export function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutClick = async () => {
    await logout();
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Navbar
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        {user && (
          <div class="navbar-nav">
            <span class="nav-item nav-link active" href="#">
              Hello, <span class="sr-only">{user.username}</span>
            </span>

            <a class="nav-item nav-link " onClick={handleLogoutClick}>
              Logout
            </a>
          </div>
        )}
        {!user && (
          <div class="navbar-nav">
            <a class="nav-item nav-link ">Login</a>

            <a class="nav-item nav-link ">Register</a>
          </div>
        )}
      </div>
    </nav>
  );
}
