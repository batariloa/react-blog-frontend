import { useAuthContext } from "./useAuthContext";
import { useState, useRef, useEffect } from "react";
import { url } from "../global/variables";
import axiosClient from "../http/axios";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const controllerRef = useRef(new AbortController());

  const submitPost = async (post) => {
    setIsLoading(true);
    setError(null);

    //create post form fields are not filled
    if (post.text.length === 0 || post.title.length === 0) {
      setError("Please fill all fields.");
      return;
    }

    //refresh controller reference
    controllerRef.current = new AbortController();

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
          signal: controllerRef.current.signal,
        }
      )
      .then((heh) => {
        console.log("THEN");
      })
      .catch((error) => {
        if (error.name === "CanceledError") {
          console.log("Aborted create post.");
        } else if (error.response) {
          console.log("Caught error", error.response.status);
          setError("Please fill all fields.");
        } else {
          setError("An error occured.");
        }
      });

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      controllerRef.current.abort();
    };
  }, []);
  return { submitPost, error, isLoading };
};
