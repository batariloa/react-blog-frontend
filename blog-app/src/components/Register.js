import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const { register, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email + " " + password);
    await register(firstName, lastName, username, email, password);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered? <span className="link-primary">Sign In</span>
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
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
