import React, { useContext } from "react";
import { useLogin } from "../hooks/useLogin";
import { renderHook } from "@testing-library/react";
import axiosClient from "../http/axios";
import { AuthContextProvider } from "../context/AuthContext";
import { act } from "react-test-renderer";

const someData = { username: "dasdasd" };
const dispatch = jest.fn();

axiosClient.post = jest.fn(() => {
  console.log("calling mock post");
  return Promise.resolve({ data: someData });
});
const wrapper = ({ children }) => (
  <AuthContextProvider value={{}}>{children}</AuthContextProvider>
);

describe("useLogin", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("calls the API and dispatches an action on successful login", async () => {
    const { result } = renderHook(() => useLogin(dispatch), { wrapper });
    const { login } = result.current;

    await act(async () => {
      await login("email", "password");
    });

    expect(dispatch).toHaveBeenCalledWith({ payload: someData, type: "LOGIN" });
  });

  it("sets error and does not dispatch on failed login", async () => {
    axiosClient.post = jest.fn(() => {
      return Promise.reject("Incorrect credentials.");
    });

    const { result } = renderHook(() => useLogin(dispatch), { wrapper });
    const { login } = result.current;

    await act(async () => {
      await login("email", "password");
    });

    expect(result.current.error).toEqual("Incorrect credentials.");
    expect(dispatch).not.toHaveBeenCalled();
  });
});
