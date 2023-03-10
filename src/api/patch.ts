import React from "react";

export const usePatch = <T extends any>() => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState<T | undefined>(undefined);
  const token = localStorage.getItem("token");

  const fetchPatch = async (object: any, path: string) => {
    setIsLoading(true);
    setIsError(false);
    const response = await fetch("http://localhost:3500/" + path, {
      method: "PATCH",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) setIsError(true);
        console.log("isok", res);
        console.log("token", token);
        return res.json();
      })

      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        console.log("isok", err);
      });
    setResult(response);
    return response;
  };
  return { isLoading, isError, fetchPatch, result };
};
