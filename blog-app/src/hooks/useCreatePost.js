import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { url } from "../global/variables";
import axiosClient from "../http/axios";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const submitPost = async (post) => {
    setIsLoading(true);
    setError(null);

    if (!user) {
      navigate("/login");
      return;
    }

    await axiosClient
      .post(
        url + "/post",
        {
          title: post.title,
          text: post.text,
        },
        {
          headers: {},
          withCredentials: true,
        }
      )
      .catch((error) => {
        console.log("Caught error", error.response);
        setError("Please fill all fields.");
      });

    setIsLoading(false);
  };

  return { submitPost, error, isLoading };
};
