import { useEffect, useState } from "react";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import { CustomApiResponse, ErrorResponse } from "./types/common";

function WithLoader<T>({
  apiFn,
  children,
  dependencies,
}: {
  apiFn: () => Promise<CustomApiResponse<T>>;
  children: ({ data }: { data: T }) => React.ReactNode;
  dependencies?: any;
}) {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    apiFn()
      .then((val) => {
        setIsLoading(false);
        if (val.isSuccess) {
          setResult(val.data);
          return;
        }
        setError(val.error);
      })
      .catch((err) => {
        setIsLoading(false);
        return setError(err);
      });
  }, [dependencies]);

  if (error) {
    return <ErrorMsg text={error.message} />;
  }

  if (isLoading || !result) {
    return <Loader />;
  }
  return <>{children({ data: result })}</>;
}

export default WithLoader;
