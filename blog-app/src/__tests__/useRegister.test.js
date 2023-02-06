import { renderHook } from "@testing-library/react";
import { act } from "react-test-renderer";
import { url } from "../global/variables";
import { useRegister } from "../hooks/useRegister";
import axiosClient from "../http/axios";
import { contextWrapper } from "./constants/context/contextWrapper";

const registerData = {
  firstname: "first",
  lastname: "last",
  username: "username",
  email: "email@gmail.com",
  password: "809sdHJJHsaa",
  repeatPassword: "809sdHJJHsaa",
};

describe("useLogin", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("sends user credentials to post request", async () => {
    const { result } = renderHook(() => useRegister(), { contextWrapper });
    const { register } = result.current;

    axiosClient.post = jest.fn(() => Promise.resolve({ data: {} }));

    await act(async () => {
      await register(
        registerData.firstname,
        registerData.lastname,
        registerData.username,
        registerData.email,
        registerData.password
      );
    });
    expect(axiosClient.post).toHaveBeenCalledWith(
      url + "/auth/register",
      registerData,
      expect.anything()
    );
  });

  it("sets error to undefined before the call", async () => {
    const { result } = renderHook(() => useRegister(), { contextWrapper });
    const { register } = result.current;

    axiosClient.post = jest.fn(() => Promise.resolve({ data: {} }));

    expect(result.current.error).toBe(undefined);

    await act(async () => {
      await register(
        registerData.firstname,
        registerData.lastname,
        registerData.username,
        registerData.email,
        registerData.password
      );
    });
    expect(result.current.error).toBe(null);
  });

  it("sets isLoading accordingly", async () => {
    const { result } = renderHook(() => useRegister(), { contextWrapper });
    const { register } = result.current;

    axiosClient.post = jest.fn(() => Promise.resolve({ data: {} }));

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await register(
        registerData.firstname,
        registerData.lastname,
        registerData.username,
        registerData.email,
        registerData.password
      );
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("sets error when request fails", async () => {
    const { result } = renderHook(() => useRegister(), { contextWrapper });
    const { register } = result.current;

    axiosClient.post = jest.fn(() => Promise.reject({ data: {} }));

    expect(result.current.error).toBe(undefined);

    await act(async () => {
      await register(
        registerData.firstname,
        registerData.lastname,
        registerData.username,
        registerData.email,
        registerData.password
      );
    });
    expect(result.current.error).not.toBe(null);
  });

  it("sets error to 'Please fill all fiels.' when empty strings are passed as parameters", async () => {
    const { result } = renderHook(() => useRegister(), { contextWrapper });
    const { register } = result.current;

    axiosClient.post = jest.fn(() => Promise.reject({ data: {} }));

    expect(result.current.error).toBe(undefined);

    await act(async () => {
      await register(
        registerData.firstname,
        registerData.lastname,
        registerData.username,
        registerData.email,
        registerData.password
      );
    });
    expect(result.current.error).not.toBe(null);
  });
});
