import { useState, useEffect } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(firstName, lastName, username, email, password);
  };

  useEffect(() => {
    if (error === null && !isLoading) navigate("/login");
  }, [error, isLoading, navigate]);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to="/login" className="link-primary">
              Sign In
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Firstname</label>
            <input
              onChange={(n) => {
                setFirstName(n.target.value);
              }}
              value={firstName}
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Lastname</label>
            <input
              onChange={(n) => {
                setLastName(n.target.value);
              }}
              value={lastName}
              type="text"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>

          <div className="form-group mt-3">
            <label>Username</label>
            <input
              onChange={(n) => {
                setUsername(n.target.value);
              }}
              value={username}
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              onChange={(p) => {
                setPassword(p.target.value);
              }}
              value={password}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary">SignUp</button>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
