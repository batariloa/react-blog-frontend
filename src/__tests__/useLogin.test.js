import { useLogin } from "../hooks/useLogin";
import { renderHook } from "@testing-library/react";
import axiosClient from "../http/axios";
import { act } from "react-test-renderer";
import { contextWrapper } from "./constants/context/contextWrapper";

const someData = { username: "dasdasd" };
const dispatch = jest.fn(() => {});

describe("useLogin", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("calls the API and dispatches a LOGIN action on successful login", async () => {
    axiosClient.post = jest.fn(() => {
      return Promise.resolve({ data: someData });
    });
    //mock dispatch function inside useLogin hook
    const { result } = renderHook(() => useLogin(dispatch), { contextWrapper });
    const { login, error, isLoading } = result.current;

    //error is unedfined at first
    expect(error).toBeUndefined();

    //isLoading should be false before initiating login
    expect(isLoading).toBe(false);

    await act(async () => {
      await login("email", "password");
    });

    //succesful login error should be null
    expect(result.current.error).toBe(null);
    //isLoading should be false after API call
    expect(result.current.isLoading).toBe(false);

    expect(dispatch).toHaveBeenCalledWith({ payload: someData, type: "LOGIN" });
  });

  it("sets error and does not dispatch on failed login", async () => {
    axiosClient.post = jest.fn(() => {
      return Promise.reject("Incorrect credentials.");
    });

    const { result } = renderHook(() => useLogin(dispatch), { contextWrapper });
    const { login, error, isLoading } = result.current;

    //error is unedfined at first
    expect(error).toBeUndefined();

    //isLoading should be false before initiating login
    expect(isLoading).toBe(false);

    await act(async () => {
      await login("email", "password");
    });

    //succesful login error should be null
    expect(result.current.error).not.toBe(null);
    //isLoading should be false after API call
    expect(result.current.isLoading).toBe(false);

    expect(result.current.error).toEqual("Incorrect credentials.");
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("sets error to 'Incorrect credentials.' after an error response from API", async () => {
    axiosClient.post = jest.fn(() =>
      Promise.reject({ name: "somename", status: 401, data: {} })
    );

    const { result } = renderHook(() => useLogin(dispatch), { contextWrapper });
    const { login } = result.current;

    await act(async () => {
      await login("email", "password");
    });

    //failed login error name should not be null
    expect(result.current.error.name).not.toBeNull();
    //failed login error message should be about incorrect credential
    expect(result.current.error).toBe("Incorrect credentials.");
  });

  it("do not set error when login is canceled", async () => {
    axiosClient.post = jest.fn(() => Promise.reject({ name: "CanceledError" }));

    const { result } = renderHook(() => useLogin(dispatch), { contextWrapper });
    const { login } = result.current;

    await act(async () => {
      await login("email", "password");
    });

    //should not display error
    expect(result.current.error).toBe(null);
  });
});
