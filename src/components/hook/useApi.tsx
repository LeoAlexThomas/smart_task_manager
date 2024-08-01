import { useState } from "react";
import { ErrorResponse } from "../types/common";

const useApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function makeApiCall<T>({
    apiFn,
    onSuccess,
    onFailure,
  }: {
    apiFn: () => Promise<T>;
    onSuccess: (res: T) => void;
    onFailure: (err: ErrorResponse) => void;
  }) {
    setIsLoading(true);
    apiFn()
      .then((val) => {
        onSuccess(val);
      })
      .catch((err) => {
        onFailure(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { makeApiCall, isLoading };
};

export default useApi;
