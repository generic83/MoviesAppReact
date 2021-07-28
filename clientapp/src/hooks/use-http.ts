import { useCallback, useState } from "react";
import HttpRequestConfig from "./HttpRequestConfig";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasHttpError, setHasHttpError] = useState<boolean>(false);

  const sendRequest = useCallback(
    (requestConfig: HttpRequestConfig, onSuccess) => {
      setIsLoading(true);
      fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "Content-Type": "application/json" },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          onSuccess(data);
        })
        .catch((error) => {
          console.log(error);
          setHasHttpError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return {
    sendRequest,
    isLoading,
    hasHttpError,
  };
};

export default useHttp;
