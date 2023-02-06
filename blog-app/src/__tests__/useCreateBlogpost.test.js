import { renderHook } from "@testing-library/react";
import { act } from "react-test-renderer";
import { useCreatePost } from "../hooks/useCreatePost";
import axiosClient from "../http/axios";
import { contextWrapper } from "./constants/context/contextWrapper";

axiosClient.post = jest.fn(() => {
  return Promise.resolve({ data: {} });
});
describe("useCreateBlogpost.test.js", () => {
  it("sets error to 'Please fill all fiels.' when empty text string is passed", async () => {
    const { result } = renderHook(() => useCreatePost(), { contextWrapper });
    const { submitPost } = result.current;

    expect(result.current.error).toBe(undefined);

    await act(async () => {
      await submitPost({ text: "", title: "da" });
    });
    expect(result.current.error).not.toBe(null);
  });

  it("sets error to 'Please fill all fiels.' when empty title string is passed", async () => {
    const { result } = renderHook(() => useCreatePost(), { contextWrapper });
    const { submitPost } = result.current;

    expect(result.current.error).toBe(undefined);

    await act(async () => {
      await submitPost({ text: "das", title: "" });
    });
    expect(result.current.error).not.toBe(null);
  });

  it("sets error to null when no fields are empty", async () => {
    const { result } = renderHook(() => useCreatePost(), { contextWrapper });
    const { submitPost } = result.current;

    expect(result.current.error).toBe(undefined);

    await act(async () => {
      await submitPost({ text: "das", title: "asda" });
    });
    expect(result.current.error).toBe(null);
  });

  //TODO add test for post request
});
