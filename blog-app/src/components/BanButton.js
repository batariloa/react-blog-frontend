import React, { Component } from "react";
import { showBan } from "../util/showBan";
import { useSuspendUser } from "../hooks/useSuspendUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BanButon(user, username) {
  const { suspend, error, isLoading } = useSuspendUser();

  //click 'Ban' button
  const handleBanUser = async () => {
    await suspend(username);
  };

  const navigate = useNavigate();
  //check for error while suspendng user
  useEffect(() => {
    if (!isLoading && error === null) navigate("/blog");
  }, [error, isLoading, navigate]);

  //load value once
  const showBanVal = showBan(user, username);
  return (
    <div>
      {showBanVal && (
        <div className="card bg-dark text-white d-inline-block  ">
          <div
            className="row   mx-auto d-flex my-auto"
            style={{ alignItems: "center" }}
          >
            {" "}
            <p className="col-lg pt-3">User {username}'s blog</p>
            <button
              onClick={handleBanUser}
              style={{ width: "300px" }}
              className="col-lg btn btn-danger mx-auto "
            >
              Ban
            </button>
          </div>
        </div>
      )}

      {!showBanVal && (
        <h2 className="text-white mt-5">User {username}'s blog</h2>
      )}
    </div>
  );
}
