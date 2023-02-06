import React from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthContextProvider } from "../context/AuthContext";
import { contextWrapper } from "./constants/context/contextWrapper";
import { render, cleanup, renderHook } from "@testing-library/react";

import { useContext } from "react";
import { act } from "react-test-renderer";

describe("AuthContext", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const { container } = render(
      <AuthContextProvider>
        <div>Test Content</div>
      </AuthContextProvider>
    );
    expect(container).toBeTruthy();
  });

  it("dispatches LOGIN action and updates the state", () => {
    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: contextWrapper,
    });

    const { dispatch } = result.current;

    const updateObject = { username: "someusername" };

    act(() => {
      dispatch({
        type: "LOGIN",
        payload: updateObject,
      });
    });
    expect(result.current.user).toEqual(updateObject);
  });

  it("dispatches LOGOUT actions and updates the state", () => {
    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: contextWrapper,
    });

    const { dispatch } = result.current;

    act(() => {
      dispatch({ type: "LOGOUT" });
    });

    expect(result.current.user).toBeNull();
  });
});
