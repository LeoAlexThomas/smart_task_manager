import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import { ErrorResponse } from "./types/common";
import useSWR, { KeyedMutator } from "swr";

function WithLoaderSWR<T>({
  apiUrl,
  children,
  customError,
  placeholder,
}: {
  apiUrl: string;
  children: ({
    data,
    mutate,
  }: {
    data: T;
    mutate: KeyedMutator<T>;
  }) => React.ReactNode;
  customError?: ({ err }: { err: ErrorResponse }) => React.ReactNode;
  placeholder?: React.ReactNode;
}) {
  const { data, error, mutate } = useSWR<T>(apiUrl);

  const isLoading = !data && !error;

  if (error) {
    return customError?.({ err: error }) ?? <ErrorMsg text={error.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return placeholder ?? <></>;
  }

  return <>{children({ data, mutate })}</>;
}

export default WithLoaderSWR;
