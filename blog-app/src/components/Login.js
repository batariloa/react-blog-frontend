import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";

import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const { login, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    await login(email, password);

    console.log("error ", error);
    if (error === null) navigate("/blog");
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit} autoComplete="on">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(p) => {
                setPassword(p.target.value);
              }}
              value={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary">Submit</button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
