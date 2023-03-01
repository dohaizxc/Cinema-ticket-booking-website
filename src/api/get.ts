import React from "react";

export const useGet = <T extends any>() => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState<T | undefined>(undefined);
  const token = localStorage.getItem("token");

  const fetchGet = async (path: any) => {
    setIsLoading(true);
    setIsError(false);
    const response = await fetch("http://localhost:3500/" + path, {
      method: "GET",
      headers: {
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

  return { isLoading, isError, fetchGet, result };
};
