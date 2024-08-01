import { useEffect, useState } from "react";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import { CustomApiResponse, ErrorResponse } from "./types/common";
import { onSnapshot } from "firebase/firestore";
import useFirebaseDBActions from "./service/firebaseDBService";

function WithLoader<T>({
  apiFn,
  children,
  updateLatestData,
  dependencies,
  customError,
}: {
  apiFn: () => Promise<CustomApiResponse<T>>;
  children: ({ data }: { data: T }) => React.ReactNode;
  updateLatestData: (val: any) => T;
  dependencies?: any;
  customError?: ({ err }: { err: ErrorResponse }) => React.ReactNode;
}) {
  const { getFirebaseCollectionRef } = useFirebaseDBActions();
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Realtime updates
  useEffect(() => {
    const collectionRef = getFirebaseCollectionRef();
    if (!collectionRef) {
      return;
    }
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setResult(
        updateLatestData(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
      );
    });

    return () => {
      unsubscribe(); // remove Observer when component unmount
    };
  }, []);

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
    return customError?.({ err: error }) ?? <ErrorMsg text={error.message} />;
  }

  if (isLoading || !result) {
    return <Loader />;
  }
  return <>{children({ data: result })}</>;
}

export default WithLoader;
