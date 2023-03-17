import React from "react";

export const usePost = <T extends any>() => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState<T | undefined>(undefined);
  const token = localStorage.getItem("token");

  const fetchPost = async (object: any, path: string) => {
    setIsLoading(true);
    setIsError(false);
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(url + path, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) setIsError(true);
        return res.json();
      })

      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
    setResult(response);
    return response;
  };
  return { isLoading, isError, fetchPost, result };
};
