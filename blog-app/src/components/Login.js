import React, { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import "./css/Login.css";

export function Login() {
  const navigate = useNavigate();
  const { login, error } = useLogin();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(emailRef.current.value, passwordRef.current.value);
  };

  //handle error in login request
  useMemo(() => {
    if (error === null) navigate("/blog");
  }, [error, navigate]);

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
              ref={emailRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
      <div className="mt-2">
        Don't have an account? <Link to="/login">Register</Link>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
