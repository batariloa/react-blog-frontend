import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { url } from "../global/variables";
import axiosClient from "../components/http/axios";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const submitPost = async (post) => {
    setError(null);

    if (!user) {
      navigate("/login");
      return;
    }

    axiosClient
      .post(
        url + "/post",
        {
          Title: post.title,
          Text: post.text,
        },
        {
          headers: {
            Authorization: `Bearer ` + user.token,
          },
        }
      )
      .catch((error) => {
        setError(error);
      });
  };

  return { submitPost, error };
};
